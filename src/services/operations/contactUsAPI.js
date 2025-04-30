import { toast } from "react-hot-toast";
import { apiConnector } from "../apiconnector";
import { contactusEndpoint } from "../api";

const { CONTACT_US_API, 
        GET_ALL_PENDING_MESSAGES_API, 
        RESPOND_TO_MESSAGE_API,
        GET_ALL_RESPONDED_MESSAGES_API 
} = contactusEndpoint;



export const submitContactFormAPI = async (data, token) => {
    const toastId = toast.loading("Sending your message...");
    let success = false;

    try {
        const response = await apiConnector(
            "POST",
            CONTACT_US_API,
            data,
            {
                Authorization: `Bearer ${token}`,
            }
        );
        if (!response?.data?.success) {
            throw new Error(response?.data?.message || "Message not sent");
        }
        toast.success("Message sent successfully!");
        success = true;

    } catch (error) {
        toast.error(error?.response?.data?.message || error.message || "Failed to send message");

        // console.log("CREATE COURSE API ERROR............", error)
        toast.error(error.message);
    }
    toast.dismiss(toastId);
    return success;

}

export const getAllPendingMessagesAPI = async (token) => {
    const toastId = toast.loading("Fetching messages...");
    let messages = [];

    try {
        const response = await apiConnector(
            "GET",
            GET_ALL_PENDING_MESSAGES_API,
            null, // No body for GET
            {
                Authorization: `Bearer ${token}`,
            }
        );

        if (!response?.data?.success) {
            throw new Error(response?.data?.message || "Failed to fetch messages");
        }

        messages = response.data.data; // assuming your backend returns { data: [...] }
        // toast.success("Messages fetched successfully!");
    } catch (error) {
        console.error("Error fetching pending messages:", error);
        toast.error(error?.response?.data?.message || error.message || "Failed to fetch messages");
    }

    toast.dismiss(toastId);
    return messages;
};
export const getAllRepondedMessagesAPI = async (token) => {
    const toastId = toast.loading("Fetching messages...");
    let messages = [];

    try {
        const response = await apiConnector(
            "GET",
            GET_ALL_RESPONDED_MESSAGES_API,
            null, // No body for GET
            {
                Authorization: `Bearer ${token}`,
            }
        );

        if (!response?.data?.success) {
            throw new Error(response?.data?.message || "Failed to fetch messages");
        }

        messages = response.data.data; // assuming your backend returns { data: [...] }
        // toast.success("Messages fetched successfully!");
    } catch (error) {
        console.error("Error fetching responded messages:", error);
        toast.error(error?.response?.data?.message || error.message || "Failed to fetch messages");
    }

    toast.dismiss(toastId);
    return messages;
};

export const respondToMessageAPI = async (messageId, responseText, token) => {
    const toastId = toast.loading("Sending response...");
    let success = false;

    try {
        const response = await apiConnector(
            "POST",
            RESPOND_TO_MESSAGE_API,
            {
                messageId,
                responseText,
            },
            {
                Authorization: `Bearer ${token}`,
            }
        );

        if (!response?.data?.success) {
            throw new Error(response?.data?.message || "Failed to send response");
        }

        toast.success("Response sent successfully!");
        success = true;
    } catch (error) {
        console.error("Respond to message error:", error);
        toast.error(error?.response?.data?.message || error.message || "Failed to send response");
    }

    toast.dismiss(toastId);
    return success;
};