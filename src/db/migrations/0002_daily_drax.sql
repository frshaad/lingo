ALTER TABLE "user_subscription" DROP CONSTRAINT "user_subscription_stripeCustomerId_unique";--> statement-breakpoint
ALTER TABLE "user_subscription" DROP CONSTRAINT "user_subscription_stripeSubscriptionId_unique";--> statement-breakpoint
ALTER TABLE "user_subscription" DROP COLUMN "stripe_customer_id";--> statement-breakpoint
ALTER TABLE "user_subscription" DROP COLUMN "stripe_subscription_id";--> statement-breakpoint
ALTER TABLE "user_subscription" DROP COLUMN "stripe_price_id";--> statement-breakpoint
ALTER TABLE "user_subscription" DROP COLUMN "stripe_current_period_end";