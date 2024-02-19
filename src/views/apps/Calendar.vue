<script setup>
import {onMounted, ref} from "vue";
import {EventService} from "@/service/EventService";
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

onMounted(async () => {
  events.value = await getEvents();
  options.value = {...options.value, ...{events: events.value}};
  events.value.forEach((item) => tags.value.push(item.tag));
});
const tags = ref([]);
let clickedEvent = null;
const view = ref("display");
const showDialog = ref(false);
const changedEvent = ref({
  title: "",
  start: "",
  end: "",
  allDay: false,
  location: "",
  borderColor: "",
  textColor: "",
  description: "",
  tag: {
    name: "Instagram",
    color: "#E1306C",
  },
});
const options = ref({
  plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
  initialDate: new Date(),
  height: 720,
  headerToolbar: {
    left: "prev,next today",
    center: "title",
    right: "dayGridMonth,timeGridWeek,timeGridDay",
  },
  editable: true,
  selectable: true,
  selectMirror: true,
  dayMaxEvents: true,
  eventClick: (e) => onEventClick(e),
  select: (e) => onDateSelect(e),
});

const events = ref(null);
const eventService = ref(new EventService());

const getEvents = async () => {
  const response = eventService.value.getEvents();

  return response;
};

const onEventClick = (e) => {
  clickedEvent = e.event;
  let plainEvent = e.event.toPlainObject({
    collapseExtendedProps: true,
    collapseColor: true,
  });
  view.value = "display";
  showDialog.value = true;

  changedEvent.value = {...plainEvent, ...clickedEvent};
  changedEvent.value.start = clickedEvent.start;
  changedEvent.value.end = clickedEvent.end ? clickedEvent.end : clickedEvent.start;
};

const onEditClick = () => {
  view.value = "edit";
};
const handleUnschedule = () => {
  events.value = events.value.filter(
      (i) => i.id.toString() !== clickedEvent.id.toString()
  );
  options.value = {...options.value, ...{events: events.value}};
  showDialog.value = false;
  clickedEvent = null;
};
const handleSave = () => {
  const isValidDate = changedEvent.value.start && changedEvent.value.end;
  if (!isValidDate) {
    return;
  }

  showDialog.value = false;
  clickedEvent = {
    ...changedEvent.value,
    backgroundColor: changedEvent.value.tag.color,
    borderColor: changedEvent.value.tag.color,
    textColor: "#212121",
  };

  setEvents();

  options.value = {...options.value, ...{events: events.value}};

  clickedEvent = null;
};

const onDateSelect = (e) => {
  view.value = "new";
  showDialog.value = true;
  changedEvent.value = {
    ...e,
    title: "",
    location: "",
    borderColor: "",
    textColor: "",
    description: "",
    tag: {
      name: "Instagram",
      color: "#E1306C",
    },
  };
};

const setEvents = () => {
  const clickedEventHasId = Object.keys(clickedEvent).some((key) => key === "id");
  if (clickedEventHasId) {
    events.value = events.value.map((i) =>
        i.id.toString() === clickedEvent.id.toString() ? (i = clickedEvent) : i
    );
  } else {
    events.value = [
      ...events.value,
      {...clickedEvent, id: Math.floor(Math.random() * 10000)},
    ];
  }
};
</script>

<template>
  <div class="grid">
    <div class="col-12">
      <div class="card">
        <div class="mb-4">
          <h3 class="font-bold text-5xl text-900">Calendar</h3>
          <p class="text-500 font-bold">View and schedule posts</p>
        </div>
        <FullCalendar :events="events" :options="options">
          <template #eventContent="{ event, timeText }">
            <div class="bg-blue-100 flex justify-content-between align-items-center p-1">
              <div class="flex">
                <i
                    :class="{
                    'pi-facebook': event.extendedProps.tag.name === 'Facebook',
                    'pi-instagram': event.extendedProps.tag.name === 'Instagram',
                    'pi-twitter': event.extendedProps.tag.name === 'X (Twitter)',
                  }"
                    :style="{ color: event.extendedProps.tag.color }"
                    class="pi flex-shrink-0 w-1rem h-1rem mr-2"
                ></i>
                {{ event.extendedProps.tag.name }}
              </div>

              <div class="flex">
                <i class="pi pi-clock flex-shrink-0 w-1rem h-1rem mr-2"></i>
                {{ timeText ? timeText : "All Day" }}
              </div>
            </div>
            <div class="flex p-1 align-items-center">
              <!-- see https://fullcalendar.io/docs/event-object -->
              <Image
                  alt="Image"
                  class="w-1rem h-1rem mr-2 flex"
                  height="15"
                  src="https://placehold.co/10x10"
                  width="15"
              />
              <span class="text-white">
                {{ event.title }}
              </span>
            </div>
          </template>
        </FullCalendar>

        <Dialog
            v-model:visible="showDialog"
            :breakpoints="{ '960px': '75vw', '640px': '90vw' }"
            :style="{
            width: '36rem',
          }"
            closable
            modal
            @onHide="view = ''"
        >
          <template #header>
            <span class="text-900 font-semibold text-xl">{{
                view === "display"
                    ? changedEvent.title
                    : view === "new"
                        ? "New Post"
                        : "Edit Post"
              }}</span>
          </template>

          <div v-if="view === 'display'">
            <span class="text-900 font-semibold block mb-2">Description</span>
            <span class="block mb-3">{{ changedEvent.description }}</span>

            <div class="grid">
              <div class="col-6">
                <div class="text-900 font-semibold mb-2">Start</div>
                <p class="flex align-items-center m-0">
                  <i class="pi pi-fw pi-clock text-700 mr-2"></i>
                  <span>{{ changedEvent.start.toISOString().slice(0, 10) }}</span>
                </p>
              </div>
              <div class="col-6">
                <div class="text-900 font-semibold mb-2">End</div>
                <p class="flex align-items-center m-0">
                  <i class="pi pi-fw pi-clock text-700 mr-2"></i>
                  <span>{{ changedEvent.end.toISOString().slice(0, 10) }}</span>
                </p>
              </div>
              <div class="col-12">
                <div class="text-900 font-semibold mb-2">Location</div>
                <p class="flex align-items-center m-0">
                  <i class="pi pi-fw pi-clock text-700 mr-2"></i>
                  <span>{{ changedEvent.location }}</span>
                </p>
              </div>
              <div class="col-12">
                <div class="text-900 font-semibold mb-2">Platform</div>
                <p class="flex align-items-center m-0">
                  <i
                      :class="{
                      'pi-facebook': changedEvent.tag.name === 'Facebook',
                      'pi-instagram': changedEvent.tag.name === 'Instagram',
                      'pi-twitter': changedEvent.tag.name === 'X (Twitter)',
                    }"
                      :style="{ color: changedEvent.tag.color }"
                      class="pi flex-shrink-0 w-1rem h-1rem mr-2"
                  ></i>

                  <span>{{ changedEvent.tag.name }}</span>
                </p>
              </div>
            </div>
          </div>
          <div v-if="view !== 'display'">
            <div class="grid p-fluid formgrid">
              <div class="col-12 field">
                <label class="text-900 font-semibold" for="title">Title</label>
                <span class="p-input-icon-left">
                  <i class="pi pi-pencil"></i>
                  <InputText
                      id="title"
                      v-model="changedEvent.title"
                      placeholder="Title"
                      type="text"
                  />
                </span>
              </div>
              <div class="col-6 flex align-items-center">
                <Image alt="Image" src="https://placehold.co/200x200"/>
              </div>

              <div class="col-6">
                <div class="col-12 field">
                  <label class="text-900 font-semibold" for="start">Start Date</label>
                  <Calendar
                      v-model="changedEvent.start"
                      :max-date="changedEvent.end"
                      dateFormat="mm-dd-yy"
                      inputId="start"
                      required
                      showTime
                  ></Calendar>
                </div>
                <div class="col-12 field">
                  <label class="text-900 font-semibold" for="start">End Date</label>
                  <Calendar
                      v-model="changedEvent.end"
                      :minDate="changedEvent.start"
                      dateFormat="mm-dd-yy"
                      inputId="end"
                      required
                      showTime
                  ></Calendar>
                </div>

                <div class="col-12 field">
                  <label class="text-900 font-semibold" for="location">Location</label>
                  <span class="p-input-icon-left">
                    <i class="pi pi-map-marker"></i>
                    <InputText
                        id="location"
                        v-model="changedEvent.location"
                        placeholder="Location"
                        type="text"
                    />
                  </span>
                </div>
              </div>

              <div class="col-12 field mt-2">
                <label class="text-900 font-semibold" for="description"
                >Description</label
                >
                <Textarea
                    id="description"
                    v-model="changedEvent.description"
                    :rows="5"
                    style="resize: none"
                    type="text"
                ></Textarea>
              </div>
              <div class="col-12 field">
                <label class="text-900 font-semibold" for="company-color">Platform</label>
                <Dropdown
                    v-model="changedEvent.tag"
                    :options="tags"
                    inputId="company-color"
                    optionLabel="name"
                >
                  <template #option="slotProps">
                    <div class="flex align-items-center">
                      <!-- <div
                        :style="{ 'background-color': slotProps.option.color }"
                        class="flex-shrink-0 w-1rem h-1rem mr-2 border-circle"
                      ></div> -->
                      <i
                          :class="{
                          'pi-facebook': slotProps.option.name === 'Facebook',
                          'pi-instagram': slotProps.option.name === 'Instagram',
                          'pi-twitter': slotProps.option.name === 'X (Twitter)',
                        }"
                          :style="{ color: slotProps.option.color }"
                          class="pi flex-shrink-0 w-1rem h-1rem mr-2"
                      ></i>
                      <div>{{ slotProps.option.name }}</div>
                    </div>
                  </template>
                  <template #value="slotProps">
                    <div class="flex align-items-center">
                      <!-- <div
                        :style="{ 'background-color': slotProps.value.color }"
                        class="flex-shrink-0 w-1rem h-1rem mr-2 border-circle"
                      ></div> -->

                      <i
                          :class="{
                          'pi-facebook': slotProps.value.name === 'Facebook',
                          'pi-instagram': slotProps.value.name === 'Instagram',
                          'pi-twitter': slotProps.value.name === 'X (Twitter)',
                        }"
                          :style="{ color: slotProps.value.color }"
                          class="pi flex-shrink-0 w-1rem h-1rem mr-2"
                      ></i>
                      <div>{{ slotProps.value.name }}</div>
                    </div>
                  </template>
                </Dropdown>
              </div>
            </div>
          </div>

          <template #footer>
            <div
                :class="{
                'justify-content-between': view === 'edit',
                'justify-content-end': view !== 'edit',
              }"
                class="flex"
            >
              <Button
                  v-if="view === 'display'"
                  icon="pi pi-pencil"
                  label="Edit"
                  @click="onEditClick"
              ></Button>

              <Button
                  v-if="view === 'edit'"
                  :disabled="!changedEvent.start || !changedEvent.end"
                  icon="pi pi-check"
                  label="Unschedule"
                  @click="handleUnschedule()"
              ></Button>
              <Button
                  v-if="view === 'new' || view === 'edit'"
                  :disabled="!changedEvent.start || !changedEvent.end"
                  icon="pi pi-check"
                  label="Save"
                  @click="handleSave()"
              ></Button>
            </div>
          </template>
        </Dialog>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
:deep(.fc-header-toolbar) {
  .fc-button {
    line-height: 1;
    min-height: 2.07rem;
  }
}
</style>
