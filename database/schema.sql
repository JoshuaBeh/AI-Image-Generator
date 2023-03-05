set client_min_messages to warning;


-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";

CREATE TABLE "public"."Users" (
	"userId" serial NOT NULL,
	"username" TEXT NOT NULL UNIQUE,
	"hashedPassword" TEXT NOT NULL,
  "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
	CONSTRAINT "Users_pk" PRIMARY KEY ("userId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."Images" (
	"imageId" serial NOT NULL,
	"userId" bigint NOT NULL,
	"src" TEXT NOT NULL,
	"prompt" TEXT NOT NULL,
  "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
	CONSTRAINT "Images_pk" PRIMARY KEY ("imageId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."Liked_Image" (
	"id" serial NOT NULL,
	"userId" bigint NOT NULL,
	"imageId" bigint NOT NULL,
  "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
	CONSTRAINT "Liked_Image_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);




ALTER TABLE "Images" ADD CONSTRAINT "Images_fk0" FOREIGN KEY ("userId") REFERENCES "Users"("userId");

ALTER TABLE "Liked_Image" ADD CONSTRAINT "Liked_Image_fk0" FOREIGN KEY ("userId") REFERENCES "Users"("userId");
ALTER TABLE "Liked_Image" ADD CONSTRAINT "Liked_Image_fk1" FOREIGN KEY ("imageId") REFERENCES "Images"("imageId");
