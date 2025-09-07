import { Inngest } from "inngest";
import User from '../models/User.js';

// Create a client to send and receive events
export const inngest = new Inngest({ id: "dailychai-app" });

//Inngest function to save user data to a databse
const syncUserCreation = inngest.createFunction(
    {id: 'sync-user-from-clerk'},
    {event: 'clerk/user.created'},
    async ({ event }) => {
        const {id, first_name, last_name, email_addresses, image_url} = event.data;
        let username = email_addresses[0]?.email_address.split('@')[0]

        const user = await User.findOne({username})
        if(user) {
            username = username + Math.floor(Math.random() * 1000);
        }

        const userData = {
            _id: id,
            email: email_addresses[0].email_address,
            full_name: first_name + "" + last_name,
            profile_picture: image_url,
            username
        }
        await User.create(userData);
    }
);

//Inngest Function to update user data in the database
const syncUserUpdation = inngest.createFunction(
    {id: 'update-user-from-clerk'},
    {event: 'clerk/user.updated'},
    async ({ event }) => {
        const {id, first_name, last_name, email_addresses, image_url} = event.data;
        
        const updatedUserData = {
            full_name: first_name + "" + last_name,
            profile_picture: image_url,
            email: email_addresses[0].email_address,
        }

        await User.findByIdAndUpdate(id, updatedUserData);
    }
);

//Inngest Function to delete user from database
const syncUserDeletion = inngest.createFunction(
    {id: 'delete-user-with-clerk'},
    {event: 'clerk/user.delete'},
    async ({ event }) => {
        const {id} = event.data;
        
        await User.findByIdAndDelete(id);
    }
);

// Create an empty array where we'll export future Inngest functions
export const functions = [
    syncUserCreation,
    syncUserUpdation,
    syncUserDeletion
];