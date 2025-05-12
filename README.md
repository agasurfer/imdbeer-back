# 🍻 Beer Styles Wiki API

A simple, well-structured RESTful API that serves as a searchable database for beer styles based on BJCP (Beer Judge Certification Program) data. Built with Node.js, Express, and MongoDB, the API allows developers to fetch detailed information about beer styles for use in apps, websites.

> Data is manually curated from the official BJCP Style Guidelines and hosted in a MongoDB Atlas database.
> I made this as a CRUD exercise, the adding, and deleting of comments are accessible by anyone.
---

## 📚 Features

- 🔎 **Get all beer styles**
- 📂 **Filter by category** (e.g. Lager, Ale, IPA, etc.)
- 📈 **Includes style attributes**: ABV range, IBU range, color (SRM), and more
- 🕹️ **Includes a fun quiz**: Test your knowledge about beer styles
- ⚙️ **RESTful endpoints** for easy integration into any app

---

## 🛠 Tech Stack

- **Backend**: Node.js + Express.js  
- **Database**: MongoDB Atlas (hosted)  
- **ODM**: Mongoose  
- **Data source**: [BJCP Style Guidelines](https://www.bjcp.org/stylecenter.php) (manually structured)

---



