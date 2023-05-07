CREATE DATABASE [WordleApp]
GO

USE [WordleApp]
GO

--DONT TOUCH
--USE master
--DROP DATABASE [FoodApp]
--GO

CREATE TABLE [USERS] (
  [user_id] integer IDENTITY(1,1) PRIMARY KEY,
  [user_email] nvarchar(255) UNIQUE,
)
GO

INSERT INTO [dbo].[USERS]
           ([user_email])
     VALUES
           ('jklol@gmail.com'),
		   ('kekw@gmail.com'),
		   ('PogO@gamil.com')
GO