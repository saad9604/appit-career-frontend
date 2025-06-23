"use server"

import { z } from "zod"

const contactSchema = z.object({
    name: z.string().min(2).max(50).trim(),
    email: z.string().email().trim(),
    message: z.string().min(10).max(500).trim(),
})

export async function submitContactForm(formData: FormData) {
    const validatedFields = contactSchema.safeParse({
        name: formData.get("name"),
        email: formData.get("email"),
        message: formData.get("message"),
    })

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        }
    }

    const { name, email, message } = validatedFields.data

    try {
        // Here you would typically:
        // 1. Save to database
        // 2. Send email notification
        // 3. Integrate with CRM

        console.log("Contact form submission:", { name, email, message })

        // Simulate processing time
        await new Promise((resolve) => setTimeout(resolve, 1000))

        return { success: true }
    } catch (error) {
        console.error("Error submitting contact form:", error);
        return {
            errors: {
                general: ["Failed to submit form. Please try again."],
            },
        }
    }
}
