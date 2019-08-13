import { Component, createElement } from "react";
import SignaturePad from "react-native-signature-pad";
import { View } from "react-native";

export class NativeSignature extends Component {
    render() {
        return (
            <View style={{ flex: 1 }}>
                <SignaturePad
                    onError={this._signaturePadError}
                    onChange={this._signaturePadChange}
                    style={{ flex: 1, backgroundColor: "white" }}
                />
            </View>
        );
    }
    _signaturePadError = (/*error*/) => {
        // eslint-disable-next-line no-console
        if (this.props.onErrorAction) {
            this.props.onErrorAction.execute();
        }
    };

    _signaturePadChange = ({ base64DataUrl }) => {
        // eslint-disable-next-line no-console
        this.props.base64attribute.setValue(base64DataUrl);
        if (this.props.onChangeAction) {
            this.props.onChangeAction.execute();
        }
    };
}
