import styled from 'styled-components';

const ChatInput = (props) => {
    const { buffer, onChange, onSubmit, handle, connected, handleColor } = props;

    return (
        <FormBox onSubmit={onSubmit}>
            <HandleLabel color={handleColor}>{connected ? `@${handle}:` : "(╯°□°)╯︵┻━┻"}</HandleLabel>
            <TextInput disabled={!connected} onChange={onChange} value={buffer} placeholder={connected ? "Message Your Homiedachis (◡ ω ◡)" : "You must connect before you can chat with your Homiedachis!!!!! (ノಠ益ಠ)ノ"} />
        </FormBox>
    )
}

export default ChatInput;

const TextInput = styled.input`
    width: 100%;
    margin-right: 0;
    border: 0;
    padding: 2px;
    font-size: 15px;
    &:focus {
        outline: none;
    }
`

const FormBox = styled.form`
    display: flex;
    flex-direction: row;
    border: 0.5px solid black;
    padding: 1px;
`

const HandleLabel = styled.label`
    width: auto;
    margin-right: 5px;
    padding: 2px;
    font-size: 15px;
    white-space:nowrap;
    font-weight: bold;
    color: ${props => props.color ? props.color : "black"}
`