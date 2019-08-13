## NativeSignature
A Mendix widget for native mobile that presents a signature pad. Uses (react-native-signature-pad) [https://github.com/kevinstumpf/react-native-signature-pad]

## Usage
- Add an unlimited length string attribute to your context object
- Drop this widget on your native page
- Configure it by selecting the unlimited length attribute
- When the user draws on the widget, it will save the signature as a PNG image into a base64 string
- If you want this signature to be saved as a Mendix Image, use a JS action to convert it. Sample code below.

## Limitations
Due to a limitation in the Pluggable Widget framework (as of 8/13/2019), it is not possible  directly save data directly to a System.FileDocument or System.Image. That's why this widget uses a base64 string attribute to store its data.

Here is a sample JS action to save a base64 string into a System.Image. Create a JavaScript action that accepts 2 inputs:
- base64String: string
- imageDocument: Mendix System.Image object

Then this is your code:

```js
    // BEGIN USER CODE
	const b64toBlob = async (b64Data) => {
		const url = b64Data;
		const response = await fetch(url);
		const blob = await response.blob();
		return blob;
	};

	return new Promise (async function(resolve,reject) {
		const blob = await b64toBlob(base64string);
		const onSuccess = () => {
			resolve(true);
		}
		const onError = () => {
			resolve(false);
		}
    	mx.data.saveDocument(imageDocument.getGuid(), imageDocument.get("Name"), {}, blob, onSuccess, onError);
	});
	// END USER CODE
```