﻿# Feature for Chez Valérie

I have developed an interface for submitting article sheets by customers, intended for use in an online store. The user interface is built with React, where I integrated a dynamic table using AG Grid. This combination provides a smooth user interaction and clear presentation of information.

For the server-side, I am using Node.js with an Express.js API, which handles the reception and processing of submitted article sheets. To facilitate exporting data in Excel format, I integrated SheetJS. This technology allows me to convert the data from the article sheets into XLSX files directly from the browser. The files are then converted into base64 Blob, which facilitates their transmission via Multer, a middleware for file upload with Node.js.

Sending these article sheets by email is done using mailtrap.io, an email testing service, which allows me to verify and validate the email sending process without risking sending accidental communications to real customers. This approach ensures an effective layer of validation and testing for the email notification system that I have implemented.

## Authors

- [@notREKASH](https://github.com/notREKASH)


## Tech Stack

**Client:** React, SASS, SheetJS, AG Grid

**Server:** Node, Express, Multer

**SMTP:** Mailtrap.io auth by domain

## Screenshots

![App Screenshot](https://live.staticflickr.com/65535/53702543964_83cbea81da_h.jpg)
---
![App Screenshot](https://live.staticflickr.com/65535/53702548749_4175e27bd8_h.jpg)
---
![App Screenshot](https://live.staticflickr.com/65535/53702204891_f5b85e89e3_h.jpg)

## License

© 2024 Benmehal Joris. All rights reserved.

This license governs the use of the "article sheet" application and its source code, which are the intellectual properties of Benmehal Joris and are exclusively owned by the company Chez Valérie - Permanent Flea Market, registered with the RCS of Besançon FR-25000 under the number 97745666400019. This project is made available for consultation and demonstration of Benmehal Joris's development skills. The use of this project is authorized subject to the following conditions:

**Non-commercial use for documentation purposes :** This project and its source code are provided for consultation and demonstration only. They may not be used for commercial purposes without the prior written permission of Benmehal Joris.

**No modifications :** This project and its source code may not be modified, transformed, or used to create derivative works.

**Attribution :** Any use of this project for demonstration purposes must include proper attribution to Benmehal Joris, the author of the project.

For any questions regarding this license or to obtain additional permissions, please contact benmehaljoris.pro@gmail.com.

## Lessons Learned

Building this project, I have learned a lot, especially about accessibility and usability for a diverse audience, with a particular focus on the mobile experience. One of the biggest challenges was using AG Grid, SheetJS, and converting to Blob base64 for the first time. To overcome these challenges, I relied on the technical documentation of each technology, which helped me address the issues encountered and optimize the use of these tools in my project.
