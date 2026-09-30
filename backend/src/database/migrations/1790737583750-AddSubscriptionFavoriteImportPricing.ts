import { MigrationInterface, QueryRunner } from "typeorm";

export class AddSubscriptionFavoriteImportPricing1790737583750 implements MigrationInterface {
    name = 'AddSubscriptionFavoriteImportPricing1790737583750'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."payment_transactions_gateway_enum" AS ENUM('VNPAY')`);
        await queryRunner.query(`CREATE TYPE "public"."payment_transactions_status_enum" AS ENUM('pending', 'success', 'failed')`);
        await queryRunner.query(`CREATE TABLE "payment_transactions" ("transaction_id" SERIAL NOT NULL, "user_id" integer NOT NULL, "amount" double precision NOT NULL, "gateway" "public"."payment_transactions_gateway_enum" NOT NULL DEFAULT 'VNPAY', "gateway_txn_ref" character varying NOT NULL, "gateway_transaction_no" character varying, "status" "public"."payment_transactions_status_enum" NOT NULL DEFAULT 'pending', "raw_response" text, "paid_at" TIMESTAMP, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_b3b7ab417ec54003f231dc75b75" PRIMARY KEY ("transaction_id"))`);
        await queryRunner.query(`CREATE TYPE "public"."subscriptions_status_enum" AS ENUM('active', 'expired', 'cancelled')`);
        await queryRunner.query(`CREATE TABLE "subscriptions" ("subscription_id" SERIAL NOT NULL, "user_id" integer NOT NULL, "transaction_id" integer NOT NULL, "plan_type" character varying NOT NULL DEFAULT 'monthly', "amount" double precision NOT NULL, "start_date" date NOT NULL, "end_date" date NOT NULL, "status" "public"."subscriptions_status_enum" NOT NULL DEFAULT 'active', "cancelled_at" TIMESTAMP, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_403b060309d7040d139e85ba53e" UNIQUE ("transaction_id"), CONSTRAINT "REL_403b060309d7040d139e85ba53" UNIQUE ("transaction_id"), CONSTRAINT "PK_33b940ef52faaafc3d05f95719f" PRIMARY KEY ("subscription_id"))`);
        await queryRunner.query(`CREATE TYPE "public"."usage_quotas_action_type_enum" AS ENUM('CHATBOT_QUERY', 'MEAL_PLAN_CREATE')`);
        await queryRunner.query(`CREATE TABLE "usage_quotas" ("usage_id" SERIAL NOT NULL, "user_id" integer, "session_id" character varying, "action_type" "public"."usage_quotas_action_type_enum" NOT NULL, "usage_count" integer NOT NULL DEFAULT '0', "period_start" TIMESTAMP NOT NULL, "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_e86f04d2bf56d431cc72b67a410" PRIMARY KEY ("usage_id"))`);
        await queryRunner.query(`CREATE TABLE "recipe_import_batches" ("batch_id" SERIAL NOT NULL, "imported_by" integer NOT NULL, "file_name" character varying NOT NULL, "total_rows" integer NOT NULL, "success_count" integer NOT NULL, "failed_count" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_7e57e2b08eb161cb10ae48ad2de" PRIMARY KEY ("batch_id"))`);
        await queryRunner.query(`CREATE TYPE "public"."recipe_import_items_status_enum" AS ENUM('success', 'failed')`);
        await queryRunner.query(`CREATE TYPE "public"."recipe_import_items_fail_reason_enum" AS ENUM('MISSING_REQUIRED_FIELD', 'UNKNOWN_INGREDIENT', 'INGREDIENT_CONFLICT')`);
        await queryRunner.query(`CREATE TABLE "recipe_import_items" ("import_item_id" SERIAL NOT NULL, "batch_id" integer NOT NULL, "row_number" integer NOT NULL, "recipe_title" character varying NOT NULL, "status" "public"."recipe_import_items_status_enum" NOT NULL, "fail_reason" "public"."recipe_import_items_fail_reason_enum", "fail_detail" text, "recipe_id" integer, CONSTRAINT "PK_0bd087c3ab8203d4f8bfdd9b211" PRIMARY KEY ("import_item_id"))`);
        await queryRunner.query(`CREATE TABLE "favorite_recipes" ("user_id" integer NOT NULL, "recipe_id" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_fefadcacb8b75445d06ad352e31" PRIMARY KEY ("user_id", "recipe_id"))`);
        await queryRunner.query(`CREATE TYPE "public"."notifications_type_enum" AS ENUM('SUBSCRIPTION_SUCCESS', 'SUBSCRIPTION_EXPIRING', 'SUBSCRIPTION_EXPIRED', 'SUBSCRIPTION_CANCELLED', 'CONTENT_COMMENT', 'CONTENT_VOTE')`);
        await queryRunner.query(`CREATE TABLE "notifications" ("notification_id" SERIAL NOT NULL, "user_id" integer NOT NULL, "type" "public"."notifications_type_enum" NOT NULL, "title" character varying NOT NULL, "message" character varying NOT NULL, "ref_type" character varying, "ref_id" integer, "is_read" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_eaedfe19f0f765d26afafa85956" PRIMARY KEY ("notification_id"))`);
        await queryRunner.query(`CREATE TYPE "public"."meal_plan_profiles_bmi_category_enum" AS ENUM('underweight', 'normal', 'overweight', 'obese')`);
        await queryRunner.query(`CREATE TYPE "public"."meal_plan_profiles_activity_level_enum" AS ENUM('sedentary', 'light', 'moderate', 'active')`);
        await queryRunner.query(`CREATE TYPE "public"."meal_plan_profiles_diet_type_enum" AS ENUM('vegan', 'lacto', 'ovo', 'ovo_lacto')`);
        await queryRunner.query(`CREATE TABLE "meal_plan_profiles" ("profile_id" SERIAL NOT NULL, "user_id" integer NOT NULL, "full_name" character varying NOT NULL, "age" integer, "gender" character varying, "height_cm" double precision, "weight_kg" double precision, "bmi" double precision, "bmi_category" "public"."meal_plan_profiles_bmi_category_enum", "activity_level" "public"."meal_plan_profiles_activity_level_enum", "diet_type" "public"."meal_plan_profiles_diet_type_enum", "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_6762b51adc04c46aac0233746c4" PRIMARY KEY ("profile_id"))`);
        await queryRunner.query(`CREATE TABLE "user_ingredient_prices" ("user_id" integer NOT NULL, "ingredient_id" integer NOT NULL, "price_per_unit" double precision NOT NULL, "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_909d0a84b07374ca05863e42ff2" PRIMARY KEY ("user_id", "ingredient_id"))`);
        await queryRunner.query(`ALTER TABLE "users" ADD "premium_until" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "meal_plans" ADD "target_profile_id" integer`);
        await queryRunner.query(`ALTER TABLE "weekly_plans" ADD "start_date" date NOT NULL`);
        await queryRunner.query(`ALTER TABLE "weekly_plans" ADD "end_date" date NOT NULL`);
        await queryRunner.query(`ALTER TABLE "payment_transactions" ADD CONSTRAINT "FK_77fab0556decc83a81a5bf8c25d" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "subscriptions" ADD CONSTRAINT "FK_d0a95ef8a28188364c546eb65c1" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "subscriptions" ADD CONSTRAINT "FK_403b060309d7040d139e85ba53e" FOREIGN KEY ("transaction_id") REFERENCES "payment_transactions"("transaction_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "recipe_import_batches" ADD CONSTRAINT "FK_2c76f267231316bab47ba567764" FOREIGN KEY ("imported_by") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "recipe_import_items" ADD CONSTRAINT "FK_6c00fd2c14cc67f28a95c2a190c" FOREIGN KEY ("batch_id") REFERENCES "recipe_import_batches"("batch_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "recipe_import_items" ADD CONSTRAINT "FK_22f17d1f7944ec813432b004a6a" FOREIGN KEY ("recipe_id") REFERENCES "recipes"("recipe_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "favorite_recipes" ADD CONSTRAINT "FK_b8eb1e0a0b29728bb97f5bd1333" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "favorite_recipes" ADD CONSTRAINT "FK_0bab1dfb655aadd347282013fbb" FOREIGN KEY ("recipe_id") REFERENCES "recipes"("recipe_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "notifications" ADD CONSTRAINT "FK_9a8a82462cab47c73d25f49261f" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "meal_plan_profiles" ADD CONSTRAINT "FK_fd9a1f473acae2bea23841764c0" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "meal_plans" ADD CONSTRAINT "FK_fe28244969b12a713b8643880a1" FOREIGN KEY ("target_profile_id") REFERENCES "meal_plan_profiles"("profile_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_ingredient_prices" ADD CONSTRAINT "FK_457925abf4b8bc2578ec1d76884" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_ingredient_prices" ADD CONSTRAINT "FK_458e2119b5bbfdd35eb816a38ab" FOREIGN KEY ("ingredient_id") REFERENCES "ingredients"("ingredient_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_ingredient_prices" DROP CONSTRAINT "FK_458e2119b5bbfdd35eb816a38ab"`);
        await queryRunner.query(`ALTER TABLE "user_ingredient_prices" DROP CONSTRAINT "FK_457925abf4b8bc2578ec1d76884"`);
        await queryRunner.query(`ALTER TABLE "meal_plans" DROP CONSTRAINT "FK_fe28244969b12a713b8643880a1"`);
        await queryRunner.query(`ALTER TABLE "meal_plan_profiles" DROP CONSTRAINT "FK_fd9a1f473acae2bea23841764c0"`);
        await queryRunner.query(`ALTER TABLE "notifications" DROP CONSTRAINT "FK_9a8a82462cab47c73d25f49261f"`);
        await queryRunner.query(`ALTER TABLE "favorite_recipes" DROP CONSTRAINT "FK_0bab1dfb655aadd347282013fbb"`);
        await queryRunner.query(`ALTER TABLE "favorite_recipes" DROP CONSTRAINT "FK_b8eb1e0a0b29728bb97f5bd1333"`);
        await queryRunner.query(`ALTER TABLE "recipe_import_items" DROP CONSTRAINT "FK_22f17d1f7944ec813432b004a6a"`);
        await queryRunner.query(`ALTER TABLE "recipe_import_items" DROP CONSTRAINT "FK_6c00fd2c14cc67f28a95c2a190c"`);
        await queryRunner.query(`ALTER TABLE "recipe_import_batches" DROP CONSTRAINT "FK_2c76f267231316bab47ba567764"`);
        await queryRunner.query(`ALTER TABLE "subscriptions" DROP CONSTRAINT "FK_403b060309d7040d139e85ba53e"`);
        await queryRunner.query(`ALTER TABLE "subscriptions" DROP CONSTRAINT "FK_d0a95ef8a28188364c546eb65c1"`);
        await queryRunner.query(`ALTER TABLE "payment_transactions" DROP CONSTRAINT "FK_77fab0556decc83a81a5bf8c25d"`);
        await queryRunner.query(`ALTER TABLE "weekly_plans" DROP COLUMN "end_date"`);
        await queryRunner.query(`ALTER TABLE "weekly_plans" DROP COLUMN "start_date"`);
        await queryRunner.query(`ALTER TABLE "meal_plans" DROP COLUMN "target_profile_id"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "premium_until"`);
        await queryRunner.query(`DROP TABLE "user_ingredient_prices"`);
        await queryRunner.query(`DROP TABLE "meal_plan_profiles"`);
        await queryRunner.query(`DROP TYPE "public"."meal_plan_profiles_diet_type_enum"`);
        await queryRunner.query(`DROP TYPE "public"."meal_plan_profiles_activity_level_enum"`);
        await queryRunner.query(`DROP TYPE "public"."meal_plan_profiles_bmi_category_enum"`);
        await queryRunner.query(`DROP TABLE "notifications"`);
        await queryRunner.query(`DROP TYPE "public"."notifications_type_enum"`);
        await queryRunner.query(`DROP TABLE "favorite_recipes"`);
        await queryRunner.query(`DROP TABLE "recipe_import_items"`);
        await queryRunner.query(`DROP TYPE "public"."recipe_import_items_fail_reason_enum"`);
        await queryRunner.query(`DROP TYPE "public"."recipe_import_items_status_enum"`);
        await queryRunner.query(`DROP TABLE "recipe_import_batches"`);
        await queryRunner.query(`DROP TABLE "usage_quotas"`);
        await queryRunner.query(`DROP TYPE "public"."usage_quotas_action_type_enum"`);
        await queryRunner.query(`DROP TABLE "subscriptions"`);
        await queryRunner.query(`DROP TYPE "public"."subscriptions_status_enum"`);
        await queryRunner.query(`DROP TABLE "payment_transactions"`);
        await queryRunner.query(`DROP TYPE "public"."payment_transactions_status_enum"`);
        await queryRunner.query(`DROP TYPE "public"."payment_transactions_gateway_enum"`);
    }

}
