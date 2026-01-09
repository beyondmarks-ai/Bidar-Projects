# How to Connect Your Form to Google Sheets & Drive

Since your website is running on the client-side, we need a secure "bridge" to talk to your Google Account without exposing your password. We will use **Google Apps Script** for this. It's free and perfect for this use case.

## Step 1: Set up the Google Sheet
1. Go to [Google Sheets](https://sheets.google.com) and create a new sheet named **"Bidar Project Requests"**.
2. In the first row (Header), add these exact column names:
   `Timestamp`, `Name`, `Contact`, `Domain`, `Tech Stack`, `Idea`, `Link`, `File URL`

## Step 2: Open the Script Editor
1. In your Google Sheet, go to **Extensions** > **Apps Script**.
2. Delete any code in the editor (`myFunction`...) and verify the file is `Code.gs`.

## Step 3: Paste the Backend Code
Copy and paste the code below into the script editor:

```javascript
function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  
  // 1. Get Data from Request
  var data = JSON.parse(e.postData.contents);
  var timestamp = new Date();
  var fileUrl = "No File Uploaded";

  // 2. Handle File Upload (Save to Drive)
  if (data.fileData && data.fileName) {
    try {
      var folderName = "Bidar Project Requirements";
      var folders = DriveApp.getFoldersByName(folderName);
      var folder = folders.hasNext() ? folders.next() : DriveApp.createFolder(folderName);
      
      var blob = Utilities.newBlob(Utilities.base64Decode(data.fileData), data.mimeType, data.fileName);
      var file = folder.createFile(blob);
      file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
      fileUrl = file.getUrl();
    } catch (error) {
      fileUrl = "Error Saving File: " + error.toString();
    }
  }

  // 3. Save to Sheet
  sheet.appendRow([
    timestamp,
    data.name,
    data.contact,
    data.domain,
    data.tech,
    data.idea,
    data.link,
    fileUrl
  ]);

  // 4. Return Success Response
  return ContentService.createTextOutput(JSON.stringify({ "result": "success", "fileUrl": fileUrl }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

## Step 4: Deploy as Web App (Crucial Step!)
1. Click the blue **Deploy** button (top right) > **New deployment**.
2. Click the **Select type** gear icon > **Web app**.
3. Fill in these details (IMPORTANT):
   - **Description**: `Project Form Backend`
   - **Execute as**: `Me` (your email)
   - **Who has access**: `Anyone` (This allows your website to send data to it).
4. Click **Deploy**.
5. **Authorize Access**: You will be asked to review permissions. Click **Review permissions** > Select account > Click **Advanced** > Click **Go to (unsafe)** (It is safe, it's your own script) > **Allow**.
6. **Copy the ‘Web App URL’**: It will look like `https://script.google.com/macros/s/.../exec`.

## Step 5: Connect to Website
1. Go to `src/components/CustomProjectModal.tsx` in your project folder.
2. Find the line: `const GOOGLE_SCRIPT_URL = "YOUR_WEB_APP_URL_HERE";`
3. Paste the URL you just copied into that string.

That's it! Your form will now save data to Sheets and files to Drive folders.
