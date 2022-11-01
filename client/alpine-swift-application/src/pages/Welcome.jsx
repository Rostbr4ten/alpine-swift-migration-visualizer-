import React, { useState, useEffect } from 'react'
import 'antd/dist/antd.css';
import sample from '../videos/vFormation.webm';

const Welcome = () => {

    return (
        <video
        height={'200%'}
            className='videoTag' autoPlay loop muted>
            <source src={sample} type='video/webm' />
        </video>

    );
};

export default Welcome;