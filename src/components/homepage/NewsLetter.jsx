import React from "react";
import { toast } from "react-toastify";
import { motion } from "motion/react";

const Newsletter = () => {
  const handleNewsletter = (e) => {
    e.preventDefault();
    const email = e.target.email.value.trim();

    if (!email) {
      toast.error("Please enter a valid email address");
      return;
    }

    toast.success("✅ Thank you for subscribing to our newsletter!");
    e.target.reset();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="my-12 md:my-16 lg:my-20 2xl:my-28 max-w-lg mx-auto p-8 rounded-2xl shadow-lg bg-base-200 dark:bg-base-300"
    >
      <h2 className="text-center mb-2 text-2xl font-bold text-base-content">
        📬 Join Our Newsletter
      </h2>
      <p className="text-center text-sm mb-6 text-base-content/80">
        Get the latest blogs, tips, and news directly to your inbox.
      </p>

      <form className="space-y-4" onSubmit={handleNewsletter}>
        <input
          className="input input-bordered w-full"
          type="email"
          name="email"
          placeholder="Enter your email"
        />
        <button
          type="submit"
          className="btn btn-primary w-full hover:scale-[1.02] transition-transform duration-200"
        >
          Subscribe
        </button>
      </form>

      <p className="text-xs text-center mt-4 text-base-content/70">
        We respect your privacy. Unsubscribe at any time.
      </p>
    </motion.div>
  );
};

export default Newsletter;
