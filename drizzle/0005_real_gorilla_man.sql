ALTER TABLE "deliivery_person" RENAME TO "delivery_person";--> statement-breakpoint
ALTER TABLE "delivery_person" DROP CONSTRAINT "deliivery_person_warehouse_id_warehouses_id_fk";
--> statement-breakpoint
ALTER TABLE "delivery_person" DROP CONSTRAINT "deliivery_person_order_id_orders_id_fk";
--> statement-breakpoint
ALTER TABLE "delivery_person" ADD CONSTRAINT "delivery_person_warehouse_id_warehouses_id_fk" FOREIGN KEY ("warehouse_id") REFERENCES "public"."warehouses"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "delivery_person" ADD CONSTRAINT "delivery_person_order_id_orders_id_fk" FOREIGN KEY ("order_id") REFERENCES "public"."orders"("id") ON DELETE cascade ON UPDATE no action;