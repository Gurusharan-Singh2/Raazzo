ALTER TABLE "delivery_person" DROP CONSTRAINT "delivery_person_order_id_orders_id_fk";
--> statement-breakpoint
ALTER TABLE "delivery_person" ALTER COLUMN "warehouse_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "delivery_person" ADD CONSTRAINT "delivery_person_order_id_orders_id_fk" FOREIGN KEY ("order_id") REFERENCES "public"."orders"("id") ON DELETE set null ON UPDATE no action;