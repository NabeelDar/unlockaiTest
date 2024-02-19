<template>
  <h3 class="font-bold text-5xl text-900 mb-6">AI Chat</h3>
  <div class="flex flex-column md:flex-row gap-5" style="min-height: 81vh">
    <div class="md:w-25rem card p-0">
      <ChatSidebar :users="users" @change:active:user="changeActiveUser" />
    </div>
    <div class="flex-1 card p-0">
      <ChatBox :user="findActiveUser()" @send:message="sendMessage" :loading="loading" />
    </div>
  </div>
</template>

<script setup>
import { nextTick, onMounted, ref } from "vue";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';
import ChatBox from "./ChatBox.vue";
import ChatSidebar from "./ChatSidebar.vue";

const aiChatEndpoint = "https://mvwgrp8slj.execute-api.us-east-1.amazonaws.com/default/aiChat";
const generateResponseEndpoint = "https://g8ahzrgyyb.execute-api.us-east-1.amazonaws.com/UnlockAI-Dev/generate-content";

const activeUserId = ref(sessionStorage.getItem("user_id"));
const users = ref([]);
const loading = ref(false);

onMounted(async () => {
  if (!activeUserId.value) {
    console.error("User ID not found in session storage");
    return;
  }
  await loadChats();
  scrollToLastMessage();
});

const loadChats = async () => {
  loading.value = true;
  try {
    const response = await axios.post(aiChatEndpoint, {
      operation: 'loadChats',
      chatId: activeUserId.value
    });
    const chatData = response.data.body ? JSON.parse(response.data.body) : [];
    updateChatData(chatData);
    loading.value = false;
  } catch (error) {
    console.error("Error loading chats:", error);
    loading.value = false;
  }
};

const sendMessage = async (messageText) => {
  const chatId = `${activeUserId.value}*${uuidv4()}`;
  const newMessage = { 
    text: messageText, 
    createdAt: new Date().getTime(), 
    ownerId: activeUserId.value 
  };

  // Format messages including the new one
  const formattedMessages = formatMessagesForLambda(newMessage);

  // Generate AI response
  const aiResponse = await getAIResponse(formattedMessages);
  const aiMessage = { 
    text: aiResponse, 
    createdAt: new Date().getTime(), 
    ownerId: 'AI' 
  };

  // Add both messages to the chat
  const activeUserObj = findActiveUser();
  if (!activeUserObj.messages) {
    activeUserObj.messages = [];
  }
  activeUserObj.messages.push(newMessage, aiMessage);

  // Store messages in the backend
  await storeChatMessage(chatId, newMessage, 'user');
  await storeChatMessage(chatId, aiMessage, 'AI');

  scrollToLastMessage();
};

function formatMessagesForLambda(newMessage) {
  const activeUser = findActiveUser();
  const allMessages = activeUser && activeUser.messages ? [...activeUser.messages, newMessage] : [newMessage];

  return allMessages.map(msg => ({
    role: msg.ownerId === activeUserId.value ? "user" : "assistant",
    content: msg.text
  }));
}

const updateChatData = (chatData) => {
  const activeUserObj = findActiveUser();
  if (activeUserObj) {
    activeUserObj.messages = chatData.map(chat => ({
      text: chat.text,
      ownerId: chat.ownerId === 'user' ? activeUserId.value : 'AI',
      createdAt: chat.createdAt
    }));
  } else {
    users.value.push({ id: activeUserId.value, name: 'Current User', messages: chatData });
    activeUserId.value = users.value[users.value.length - 1].id;  // Update active user ID
  }
};

const changeActiveUser = async (user) => {
  activeUserId.value = user.id;
  await loadChats();
  scrollToLastMessage();
};

const storeChatMessage = async (chatId, message, sender) => {
  try {
    await axios.post(aiChatEndpoint, {
      operation: 'storeChat',
      chatId: chatId,
      message: message.text,
      sender: sender
    });
  } catch (error) {
    console.error("Error storing chat message:", error);
  }
};

const getAIResponse = async (formattedMessages) => {
  loading.value = true;
  try {
    const response = await axios.post(generateResponseEndpoint, {
      action: 'generate_response',
      context: formattedMessages,
      user_id: activeUserId.value  // Include user_id in the request
    });
    loading.value = false;
    return response.data.message;
  } catch (error) {
    console.error("Error getting AI response:", error);
    loading.value = false;
    return "Could not get AI response.";
  }
};

const findActiveUser = () => {
  return users.value.find((user) => user.id === activeUserId.value) || {};
};

const scrollToLastMessage = async () => {
  await nextTick(() => {
    const element = document.querySelector(".user-message-container");
    if (element) {
      element.scroll({ top: element.scrollHeight, behavior: 'smooth' });
    }
  });
};
</script>
