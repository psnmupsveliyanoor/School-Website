const express = require("express");
const nodemailer = require("nodemailer");

const router = express.Router();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// ─────────────────────────────────────────────
// ADMISSION FORM
// ─────────────────────────────────────────────
router.post("/admission", async (req, res) => {
  try {
    const {
      studentName,
      dob,
      gender,
      gradeApplying,
      parentName,
      phone,
      email,
      address,
      previousSchool,
      message,
    } = req.body;

    if (!studentName || !dob || !gender || !gradeApplying || !parentName || !phone) {
      return res.status(400).json({
        success: false,
        message: "Please fill in all required fields.",
      });
    }

    await transporter.sendMail({
      from: `"PSNM Website" <${process.env.EMAIL_USER}>`,
      to: process.env.CONTACT_RECEIVER,
      replyTo: email || process.env.EMAIL_USER,
      subject: `New Admission Application - ${studentName}`,

      html: `
        <div style="font-family: Arial, sans-serif; max-width: 700px; margin: auto;">
          <h2 style="color: #2563EB;">
            New Admission Application
          </h2>

          <hr />

          <h3>Student Information</h3>

          <p><strong>Student Name:</strong> ${studentName}</p>
          <p><strong>Date of Birth:</strong> ${dob}</p>
          <p><strong>Gender:</strong> ${gender}</p>
          <p><strong>Class Applying For:</strong> ${gradeApplying}</p>

          <h3>Parent / Guardian Information</h3>

          <p><strong>Parent / Guardian:</strong> ${parentName}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Email:</strong> ${email || "Not provided"}</p>
          <p><strong>Address:</strong> ${address || "Not provided"}</p>

          <h3>Previous School</h3>

          <p>${previousSchool || "Not provided"}</p>

          <h3>Additional Notes</h3>

          <p>${message || "No additional notes."}</p>

          <hr />

          <p style="color: #666; font-size: 12px;">
            This admission application was submitted through the PSNM website.
          </p>
        </div>
      `,
    });

    res.status(200).json({
      success: true,
      message: "Admission application sent successfully.",
    });
  } catch (error) {
    console.error("Admission email error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to send admission application.",
    });
  }
});

// ─────────────────────────────────────────────
// ENQUIRY FORM
// ─────────────────────────────────────────────
router.post("/enquiry", async (req, res) => {
  try {
    const {
      name,
      phone,
      grade,
      question,
    } = req.body;

    if (!name || !phone) {
      return res.status(400).json({
        success: false,
        message: "Name and phone number are required.",
      });
    }

    await transporter.sendMail({
      from: `"PSNM Website" <${process.env.EMAIL_USER}>`,
      to: process.env.CONTACT_RECEIVER,
      subject: `New Admission Enquiry - ${name}`,

      html: `
        <div style="font-family: Arial, sans-serif; max-width: 700px; margin: auto;">
          <h2 style="color: #2563EB;">
            New Admission Enquiry
          </h2>

          <hr />

          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Grade of Interest:</strong> ${grade || "Not specified"}</p>

          <h3>Question</h3>

          <p>${question || "No question provided."}</p>

          <hr />

          <p style="color: #666; font-size: 12px;">
            This enquiry was submitted through the PSNM website.
          </p>
        </div>
      `,
    });

    res.status(200).json({
      success: true,
      message: "Enquiry sent successfully.",
    });
  } catch (error) {
    console.error("Enquiry email error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to send enquiry.",
    });
  }
});

module.exports = router;