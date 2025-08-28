ALTER TABLE "delivery_person" DROP CONSTRAINT "delivery_person_order_id_orders_id_fk";
--> statement-breakpoint
ALTER TABLE "delivery_person" ADD CONSTRAINT "delivery_person_order_id_orders_id_fk" FOREIGN KEY ("order_id") REFERENCES "public"."orders"("id") ON DELETE no action ON UPDATE no action;