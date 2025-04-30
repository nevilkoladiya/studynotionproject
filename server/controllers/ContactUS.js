import {contactUsEmail} from "../mail/templates/contectFromRes.js"
import { adminRespondTo } from "../mail/templates/contectFromRes.js"

import mailSender from "../utils/mailSender.js"
import SupportMessage from "../models/SupportMessage.js"

export const contactUsController = async (req, res) => {
  const { email, firstname, lastname, message, phoneNo, countrycode } = req.body
  console.log(req.body)
  try {
    const emailRes = await mailSender(
      email,
      "Your Data send successfully",
      contactUsEmail(email, firstname, lastname, message, phoneNo, countrycode)
    )
    // console.log("Email Res ", emailRes)
    
    // Get user ID from request object
    const userId = req.user.id;
    await SupportMessage.create({
      userId: userId || null,
      email,
      firstname,
      lastname,
      phoneNo,
      countrycode,
      message,
    });

    return res.json({
      success: true,
      message: "Message send successfully",
    })
  } catch (error) {
    console.log("Error", error)
    console.log("Error message :", error.message)
    return res.json({
      success: false,
      message: "Something went wrong...",
    })
  }
}

export const getAllPendingMessage = async (req, res) => {
  try {
    const pendingMessages = await SupportMessage.find({ status: "pending" });

    return res.status(200).json({
      success: true,
      message: "Pending messages fetched successfully",
      data: pendingMessages,
    });
  } catch (error) {
    console.error("Error fetching pending messages:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch pending messages",
      error: error.message,
    });
  }
};
export const getAllRespondedMessage = async (req, res) => {
  try {
    const respondedMessages = await SupportMessage.find({ status: "responded" });

    return res.status(200).json({
      success: true,
      message: "Responded messages fetched successfully",
      data: respondedMessages,
    });
  } catch (error) {
    console.error("Error fetching Responded messages:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch Responded messages",
      error: error.message,
    });
  }
};

export const respondToMessage = async (req, res) => {
  try {
    const { messageId, responseText } = req.body;

    if (!messageId || !responseText) {
      return res.status(400).json({
        success: false,
        message: "Missing messageId or responseText",
      });
    }


    const updatedMessage = await SupportMessage.findByIdAndUpdate(
      messageId,
      {
        response: responseText,
        status: "responded",
      },
      { new: true }
    );

    const emailRes = await mailSender(
      updatedMessage.email,
      "Response from StudyNotion",
      adminRespondTo(updatedMessage.firstname, updatedMessage.lastname, updatedMessage.message, responseText)
    )

    if (!updatedMessage) {
      return res.status(404).json({
        success: false,
        message: "Message not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Response sent successfully",
      data: updatedMessage,
    });
  } catch (error) {
    console.error("Error responding to message:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};