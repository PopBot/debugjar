import React from "react";
import Message from "./Message";

export default class MessageList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            messagesSnapshot: undefined,
        }
    }
    componentDidMount() {
        this.unlisten = this.props.messagesRef.on("value", snapshot => this.setState({ messagesSnapshot: snapshot, price: this.props.price }));
    }
    componentWillUnmount() {
        this.props.messagesRef.off("value", this.unlisten);
    }
    render() {
        if (this.state.messagesSnapshot === undefined) {
            return <div>loading...</div>;
        }
        let messages = [];
        this.state.messagesSnapshot.forEach(messageSnapshot => {
            messages.push(<Message key={messageSnapshot.key} messageSnapshot={messageSnapshot} />)
        });
        return (
            <div>
                {messages}
            </div>
        );
    }
}