import { Button, Checkbox } from 'antd';
import { useState } from 'react';

const Checklist = () => {
    const [checked, setChecked] = useState(true);
    const [disabled, setDisabled] = useState(false);

    const toggleChecked = () => {
        setChecked(!checked);
    };

    // const toggleDisable = () => {
    //     setDisabled(!disabled);
    // };

    const onChange = (e) => {
        console.log('checked = ', e.target.checked);
        setChecked(e.target.checked);
    };

    // const label = `${checked ? 'Checked' : 'Unchecked'}-${disabled ? 'Disabled' : 'Enabled'}`;
    return (
        <>
            <p
                style={{
                    marginBottom: '20px',
                }}
            >
                <Checkbox checked={false} disabled={disabled} onChange={onChange}>
                    {/* {label} */}
                    Item1
                </Checkbox>
            </p>
            <p
                style={{
                    marginBottom: '20px',
                }}
            >
                <Checkbox checked={true} disabled={disabled} onChange={onChange}>
                    {/* {label} */}
                    Item2
                </Checkbox>
            </p>
            <p
                style={{
                    marginBottom: '20px',
                }}
            >
                <Checkbox checked={true} disabled={disabled} onChange={onChange}>
                    {/* {label} */}
                    Item3
                </Checkbox>
            </p>
            {/* <p>
                <Button type="primary" size="small" onClick={toggleChecked}>
                    {!checked ? 'Check' : 'Uncheck'}
                </Button>
                <Button
                    style={{
                        margin: '0 10px',
                    }}
                    type="primary"
                    size="small"
                    onClick={toggleDisable}
                >
                    {!disabled ? 'Disable' : 'Enable'}
                </Button>
            </p> */}
        </>
    );
};

export default Checklist;