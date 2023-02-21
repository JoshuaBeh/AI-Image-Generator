set client_min_messages to warning;


-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";

CREATE TABLE "public"."Users" (
	"id" serial NOT NULL,
	"username" TEXT NOT NULL UNIQUE,
	"password" TEXT NOT NULL,
	"created_at" DATE NOT NULL,
	CONSTRAINT "Users_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."Images" (
	"id" serial NOT NULL,
	"user_id" bigint NOT NULL,
	"src" TEXT NOT NULL,
	"prompt" TEXT NOT NULL,
	"likes" bigint NOT NULL,
	"created_at" DATE NOT NULL,
	CONSTRAINT "Images_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."Liked_Image" (
	"id" serial NOT NULL,
	"user_id" bigint NOT NULL,
	"image_id" bigint NOT NULL,
	"liked_at" TIMESTAMP NOT NULL,
	CONSTRAINT "Liked_Image_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);




ALTER TABLE "Images" ADD CONSTRAINT "Images_fk0" FOREIGN KEY ("user_id") REFERENCES "Users"("id");

ALTER TABLE "Liked_Image" ADD CONSTRAINT "Liked_Image_fk0" FOREIGN KEY ("user_id") REFERENCES "Users"("id");
ALTER TABLE "Liked_Image" ADD CONSTRAINT "Liked_Image_fk1" FOREIGN KEY ("image_id") REFERENCES "Images"("id");
