/* global chrome */
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.type === "get_recipe") {
    sendResponse({
      error: { message: "Could not find a recipe in the page." }
    });
  }
});
