import { Client, Account, Databases, Storage, Avatars } from "appwrite";

// Default values as fallbacks
const defaultAppwriteUrl = "https://cloud.appwrite.io/v1";

// Appwrite configuration
export const appwriteConfig = {
  url: import.meta.env.VITE_APPWRITE_URL || defaultAppwriteUrl,
  projectId: import.meta.env.VITE_APPWRITE_PROJECT_ID || 'mock_project_id',
  databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID || 'mock_database_id',
  storageId: import.meta.env.VITE_APPWRITE_STORAGE_ID || 'mock_storage_id',
  userCollectionId: import.meta.env.VITE_APPWRITE_USER_COLLECTION_ID || 'mock_user_collection',
  postCollectionId: import.meta.env.VITE_APPWRITE_POST_COLLECTION_ID || 'mock_post_collection',
  savesCollectionId: import.meta.env.VITE_APPWRITE_SAVES_COLLECTION_ID || 'mock_saves_collection',
  // Mirani Well Wellness Collections
  journalCollectionId: import.meta.env.VITE_APPWRITE_JOURNAL_COLLECTION_ID || 'mock_journal_collection',
  affirmationsCollectionId: import.meta.env.VITE_APPWRITE_AFFIRMATIONS_COLLECTION_ID || 'mock_affirmations_collection',
  ritualSessionsCollectionId: import.meta.env.VITE_APPWRITE_RITUAL_SESSIONS_COLLECTION_ID || 'mock_ritual_sessions_collection',
  aiInsightsCollectionId: import.meta.env.VITE_APPWRITE_AI_INSIGHTS_COLLECTION_ID || 'mock_ai_insights_collection',
  moodEntriesCollectionId: import.meta.env.VITE_APPWRITE_MOOD_ENTRIES_COLLECTION_ID || 'mock_mood_entries_collection',
};

// Check if we should disable Appwrite initialization 
// This environment variable will be set when using Clerk exclusively
const isAppwriteDisabled = import.meta.env.VITE_DISABLE_APPWRITE === 'true';

// Initialize the Appwrite client
export const client = new Client();
export let account: Account;
export let databases: Databases;
export let storage: Storage;
export let avatars: Avatars;

// Only initialize Appwrite if not disabled
if (!isAppwriteDisabled) {
  try {
    client.setEndpoint(appwriteConfig.url);
    client.setProject(appwriteConfig.projectId);
    
    console.log("Appwrite client configured with:", { 
      url: appwriteConfig.url,
      projectId: appwriteConfig.projectId,
      isDevelopment: import.meta.env.DEV
    });
    
    // Initialize services
    account = new Account(client);
    databases = new Databases(client);
    storage = new Storage(client);
    avatars = new Avatars(client);
    
  } catch (error) {
    console.error("Failed to configure Appwrite client:", error);
  }
} else {
  console.log('🚨 Appwrite disabled - using mock client');
  // Create a mock client that doesn't make network requests
  const mockClient = {
    setEndpoint: () => mockClient,
    setProject: () => mockClient
  } as any;
  
  // Create mock services that return promises but don't make network calls
  account = {
    get: () => Promise.reject(new Error('Appwrite disabled')),
    create: () => Promise.reject(new Error('Appwrite disabled')),
    createEmailSession: () => Promise.reject(new Error('Appwrite disabled')),
    deleteSession: () => Promise.reject(new Error('Appwrite disabled'))
  } as any;
  
  databases = {
    createDocument: () => Promise.reject(new Error('Appwrite disabled')),
    updateDocument: () => Promise.reject(new Error('Appwrite disabled')),
    getDocument: () => Promise.reject(new Error('Appwrite disabled')),
    listDocuments: () => Promise.reject(new Error('Appwrite disabled')),
    deleteDocument: () => Promise.reject(new Error('Appwrite disabled'))
  } as any;
  
  storage = {
    createFile: () => Promise.reject(new Error('Appwrite disabled')),
    getFilePreview: () => Promise.reject(new Error('Appwrite disabled')),
    deleteFile: () => Promise.reject(new Error('Appwrite disabled'))
  } as any;
  
  avatars = {
    getInitials: () => Promise.reject(new Error('Appwrite disabled'))
  } as any;
}
