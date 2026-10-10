# Nagi Privacy Policy

Last updated: October 10, 2026

Nagi is an Android workspace browser developed by TakeruF. This policy covers both the Google Play edition and the APK edition distributed through GitHub and takeruf.com. Contact: [support@takeruf.com](mailto:support@takeruf.com).

## Data stored on your device

Nagi stores tabs, page titles and URLs, Spaces, Favorites, bookmarks, browsing history, settings, cached site icons, and website cookies and storage on your device. Nagi has no developer-operated account or cloud sync, advertising SDK, analytics SDK, or automatic crash-reporting service. This information is not uploaded to the developer. Cookies and site logins are shared across Spaces; Spaces are not separate privacy profiles.

## Private browsing, blocking, and Reader

Private browsing uses a separate, temporary WebView profile and an in-memory workspace when the WebView supports profile isolation and browsing-data deletion. Private history, tabs, settings, and site icons are not saved in the normal workspace. Cookies and website storage can be written to isolated disk storage during the session; closing the private workspace clears its website data, and leftover profiles after abrupt termination are removed on the next cold startup. Private windows disable screenshots, recent-app previews, and autofill. Downloads and information you explicitly copy or share remain outside the private workspace. This mode does not hide your IP address from websites or network operators.

Advertisement and tracker matching and Reader extraction run locally. Filter updates contact easylist.to and filters.adtidy.org over HTTPS; these providers see your connection IP, but Nagi does not send visited URLs, cookies, or history in the filter requests. Filter data and persistent site exceptions are stored locally. A visit pause is temporary and is not restored after app restart. Reader sanitizes extracted article HTML and retains it temporarily; loading article images and following links can contact their website providers. Page content is not sent to the developer or an AI service.

## Websites, search, and AI services

Opening a page or searching connects your device to the selected website or search provider. These services can receive your IP address, browser information, queries, cookies, form entries, and files you choose to upload. Site icons may be downloaded from visited website origins. Their handling of data is governed by their own policies. “Ask ChatGPT” opens ChatGPT with your entered query in the URL; Nagi does not automatically send the current page contents or your browsing history to an AI service. Android System WebView supplies the browser engine, including its platform security services such as Safe Browsing.

## Automatic search by region

When automatic regional search is enabled, Nagi connects over HTTPS to [api.country.is](https://api.country.is/) to determine a country from your connection IP. The service sees your source IP; Nagi does not send search queries, history, precise location, or device identifiers in this request. Nagi stores the resulting country and lookup time locally to select appropriate default search engines. Network/SIM country or device region may be used locally as a fallback. You can disable automatic regional search in Settings and choose an engine manually. Nagi does not control the provider’s server logs or retention.

## Permissions and files

Camera, microphone, and location access are requested when a website needs them and require your permission. Data you allow a website to use is handled by that website. Uploads use Android’s document picker to access selected files. Downloads are stored through Android’s download service and may remain after uninstalling Nagi. No broad file-system access or background location permission is requested.

Photo uploads can open Android’s camera with your permission; the resulting JPEG is held in app-private cache and shared with the website you selected. Page-generated Blob/data downloads up to 32 MB are saved after confirmation. Dragging links or images can share the selected URL or image with the drop destination. Password autofill uses your selected Android provider and WebView’s website form integration; Nagi has no password vault or developer-operated credential service.

## Updates by distribution channel

The Google Play edition receives updates through Google Play. It does not contact GitHub to check for APK updates and does not download or install APKs to update itself. The GitHub/APK edition checks GitHub’s release manifest on startup and on request. GitHub sees the connection IP and an Nagi-version User-Agent. APK downloads and installation require user action; Android asks for installation authorization. No browsing history or queries are included in these update requests.

## Retention, deletion, and security

Local workspace information remains until removed in Nagi or through Android’s app-data controls. Settings offers separate actions to clear browsing history and to clear cookies, website storage, and page cache. Clearing website data retains tabs, bookmarks, and history. Clearing Android app data or uninstalling removes app-private data; files in public Downloads must be deleted separately. Server-side data held by websites or providers must be managed through those providers. Nagi disables Android app backup. App-controlled region and update requests use HTTPS; websites may use HTTP, which does not encrypt their traffic. Nagi rejects certificate errors, blocks mixed content, and blocks third-party cookies, but no system is completely secure.

## Contact and changes

If you contact the developer, your message and contact details are used to respond to your request and retained as needed for that correspondence. You can request deletion of that correspondence at support@takeruf.com. Do not send passwords or unnecessary sensitive information. Changes to this policy will be published here with an updated date.
