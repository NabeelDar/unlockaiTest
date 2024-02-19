<script setup>
import {ref} from 'vue';

const items = ref([
  {
    label: 'Update',
    icon: 'pi pi-refresh'
  },
  {
    label: 'Delete',
    icon: 'pi pi-times'
  },
  {
    separator: true
  },
  {
    label: 'Home',
    icon: 'pi pi-home'
  }
]);

const loading = ref([false, false, false]);

const load = (index) => {
  loading.value[index] = true;
  setTimeout(() => (loading.value[index] = false), 1000);
};
</script>

<template>
  <div class="grid">
    <div class="col-12 md:col-6">
      <div class="card">
        <h5>Default</h5>
        <div class="flex flex-wrap gap-2">
          <Button label="Submit"></Button>
          <Button :disabled="true" label="Disabled"></Button>
          <Button label="Link" link/>
        </div>
      </div>

      <div class="card">
        <h5>Severities</h5>
        <div class="flex flex-wrap gap-2">
          <Button label="Primary"/>
          <Button label="Secondary" severity="secondary"/>
          <Button label="Success" severity="success"/>
          <Button label="Info" severity="info"/>
          <Button label="Warning" severity="warning"/>
          <Button label="Danger" severity="danger"/>
        </div>
      </div>

      <div class="card">
        <h5>Text</h5>
        <div class="flex flex-wrap gap-2">
          <Button label="Primary" text/>
          <Button label="Secondary" severity="secondary" text/>
          <Button label="Success" severity="success" text/>
          <Button label="Info" severity="info" text/>
          <Button label="Warning" severity="warning" text/>
          <Button label="Help" severity="help" text/>
          <Button label="Danger" severity="danger" text/>
          <Button label="Plain" plain text/>
        </div>
      </div>

      <div class="card">
        <h5>Outlined</h5>
        <div class="flex flex-wrap gap-2">
          <Button label="Primary" outlined/>
          <Button label="Secondary" outlined severity="secondary"/>
          <Button label="Success" outlined severity="success"/>
          <Button label="Info" outlined severity="info"/>
          <Button label="Warning" outlined severity="warning"/>
          <Button label="Help" outlined severity="help"/>
          <Button label="Danger" outlined severity="danger"/>
        </div>
      </div>

      <div class="card">
        <h5>Button Group</h5>
        <div class="flex flex-wrap gap-2">
                    <span class="p-buttonset">
                        <Button icon="pi pi-check" label="Save"/>
                        <Button icon="pi pi-trash" label="Delete"/>
                        <Button icon="pi pi-times" label="Cancel"/>
                    </span>
        </div>
      </div>

      <div class="card">
        <h5>SplitButton</h5>
        <div class="flex flex-wrap gap-2">
          <SplitButton :model="items" icon="pi pi-check" label="Save" severity="secondary"></SplitButton>
          <SplitButton :model="items" icon="pi pi-check" label="Save" severity="success"></SplitButton>
          <SplitButton :model="items" icon="pi pi-check" label="Save" severity="info"></SplitButton>
          <SplitButton :model="items" icon="pi pi-check" label="Save" severity="warning"></SplitButton>
          <SplitButton :model="items" icon="pi pi-check" label="Save" severity="danger"></SplitButton>
        </div>
      </div>

      <div class="card">
        <h5>Templating</h5>
        <div class="flex flex-wrap gap-2">
          <Button type="button">
            <img alt="logo" src="/demo/images/logo-white.svg" style="width: 1.5rem"/>
          </Button>
          <Button outlined severity="success" type="button">
            <img alt="logo" src="/demo/images/logo.svg" style="width: 1.5rem"/>
            <span class="ml-2 text-bold">PrimeVue</span>
          </Button>
        </div>
      </div>
    </div>

    <div class="col-12 md:col-6">
      <div class="card">
        <h5>Icons</h5>
        <div class="flex flex-wrap gap-2">
          <Button icon="pi pi-star-fill"></Button>
          <Button icon="pi pi-bookmark" label="Bookmark"></Button>
          <Button icon="pi pi-bookmark" iconPos="right" label="Bookmark"></Button>
        </div>
      </div>

      <div class="card">
        <h5>Raised</h5>
        <div class="flex flex-wrap gap-2">
          <Button label="Primary" raised/>
          <Button label="Secondary" raised severity="secondary"/>
          <Button label="Success" raised severity="success"/>
          <Button label="Info" raised severity="info"/>
          <Button label="Warning" raised severity="warning"/>
          <Button label="Danger" raised severity="danger"/>
        </div>
      </div>

      <div class="card">
        <h5>Rounded</h5>
        <div class="flex flex-wrap gap-2">
          <Button label="Primary" rounded/>
          <Button label="Secondary" rounded severity="secondary"/>
          <Button label="Success" rounded severity="success"/>
          <Button label="Info" rounded severity="info"/>
          <Button label="Warning" rounded severity="warning"/>
          <Button label="Danger" rounded severity="danger"/>
        </div>
      </div>

      <div class="card">
        <h5>Rounded Icons</h5>
        <div class="flex flex-wrap gap-2">
          <Button icon="pi pi-star-fill" rounded/>
          <Button icon="pi pi-bookmark" rounded severity="secondary"/>
          <Button icon="pi pi-check" rounded severity="success"/>
          <Button icon="pi pi-search" rounded severity="info"/>
          <Button icon="pi pi-user" rounded severity="warning"/>
          <Button icon="pi pi-sign-out" rounded severity="danger"/>
        </div>
      </div>

      <div class="card">
        <h5>Rounded Text</h5>
        <div class="flex flex-wrap gap-2">
          <Button icon="pi pi-check" rounded text/>
          <Button icon="pi pi-bookmark" rounded severity="secondary" text/>
          <Button icon="pi pi-search" rounded severity="success" text/>
          <Button icon="pi pi-user" rounded severity="info" text/>
          <Button icon="pi pi-bell" rounded severity="warning" text/>
          <Button icon="pi pi-heart" rounded severity="help" text/>
          <Button icon="pi pi-times" rounded severity="danger" text/>
          <Button icon="pi pi-filter" rounded severity="plain" text/>
        </div>
      </div>

      <div class="card">
        <h5>Rounded Outlined</h5>
        <div class="flex flex-wrap gap-2">
          <Button icon="pi pi-check" outlined rounded/>
          <Button icon="pi pi-bookmark" outlined rounded severity="secondary"/>
          <Button icon="pi pi-search" outlined rounded severity="success"/>
          <Button icon="pi pi-user" outlined rounded severity="info"/>
          <Button icon="pi pi-bell" outlined rounded severity="warning"/>
          <Button icon="pi pi-heart" outlined rounded severity="help"/>
          <Button icon="pi pi-times" outlined rounded severity="danger"/>
        </div>
      </div>

      <div class="card">
        <h5>Loading</h5>
        <div class="flex flex-wrap gap-2">
          <Button :loading="loading[0]" icon="pi pi-search" label="Search" type="button" @click="load(0)"/>
          <Button :loading="loading[1]" icon="pi pi-search" iconPos="right" label="Search" type="button"
                  @click="load(1)"/>
          <Button :loading="loading[2]" icon="pi pi-search" type="button" @click="load(2)"/>
          <Button :loading="loading[3]" label="Search" type="button" @click="load(3)"/>
        </div>
      </div>
    </div>
  </div>
</template>
