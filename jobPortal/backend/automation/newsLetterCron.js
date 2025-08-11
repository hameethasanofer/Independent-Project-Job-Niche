import cron from "node-cron";
import { Job } from "../models/jobSchema.js";
import { User } from "../models/userSchema.js";
import { sendEmail } from "../utils/sendEmail.js";

export const newsLetterCron = () => {
  cron.schedule("*/1 * * * *", async () => {
    try {
      console.log("⏰ Running Cron Automation");

      // Step 1: Find jobs that haven't been emailed yet
      const jobs = await Job.find({ newsLettersSent: false });

      console.log("🟡 Jobs found for newsletter:", jobs.length);
      jobs.forEach(job => {
        console.log(`📌 Found job: '${job.title}' | newsLettersSent: ${job.newsLettersSent}`);
      });

      // Step 2: Loop through each job
      for (const job of jobs) {
        console.log(`📨 Processing job: ${job.title}`);
        console.log(`🔍 Job niche: '${job.jobNiche}'`);

        const jobNiche = job.jobNiche;

        // Step 3: Match users whose niche matches the job's niche (case-insensitive)
        const filteredUsers = await User.find({
          $or: [
            { "niches.firstNiche": { $regex: `^${jobNiche}$`, $options: "i" } },
            { "niches.secondNiche": { $regex: `^${jobNiche}$`, $options: "i" } },
            { "niches.thirdNiche": { $regex: `^${jobNiche}$`, $options: "i" } },
          ],
        });

        console.log(`👤 Users matched for job '${job.title}': ${filteredUsers.length}`);

        // Step 4: Send email to each matched user
        for (const user of filteredUsers) {
          console.log(`➡️ Sending email to: ${user.email}`);

          const subject = `Hot Job Alert: ${job.title} in ${job.jobNiche} Available Now`;
          const message = `Hi ${user.name},\n\nGreat news! A new job that fits your niche has just been posted. Check it out and apply soon!\n\nJob Title: ${job.title}\nCategory: ${job.jobNiche}\nLocation: ${job.location}\nCompany: ${job.companyName}\n\nBest,\nThe Jobs Team`;

          try {
            await sendEmail({
              email: user.email,
              subject,
              message,
            });
            console.log(`📧 Email sent to: ${user.email}`);
          } catch (emailErr) {
            console.error(`❌ Error sending to ${user.email}:`, emailErr.message);
          }
        }

        // Step 5: Mark job as processed using .save()
        job.newsLettersSent = true;
        await job.save();
        console.log(`✅ Job '${job.title}' marked as newsletter sent`);
      }
    } catch (error) {
      console.error("❌ Error in newsletter cron job:", error.message);
    }
  });
};
