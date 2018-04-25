import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Article extends React.Component {
    render() {
        return (
            <div>
                <p>article 1</p>
                <Link to="/">回去</Link>
            </div>
        )
    }
}