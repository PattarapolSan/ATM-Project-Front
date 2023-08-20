import React, {useState} from 'react';
import './Content.css';



function Content() {
    const [screen, setScreen] = useState('error');

    const mainScreen = (
        <>Hello</>
    );

    const resultScreen = (
        <>world</>
    );

    const errorScreen = (
        <>error</>
    );

    return (
        <div className='Content'>
            {screen === 'main'? mainScreen : screen === 'result' ? resultScreen : errorScreen}
        </div>
    );
}


export default Content;