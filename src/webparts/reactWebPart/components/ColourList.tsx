import * as React from 'react';
import {IColour} from '../IColour';

export interface IColourListProps {
    colours: IColour[];
}

export class ColourList extends React.Component <IColourListProps, {}> {
public render(): React.ReactElement<IColourListProps>{
    return(
        <ul>
            {
                this.props.colours.map(colourItem => (
                    <li>{ colourItem.title }</li>
                ))
            }
        </ul>
    );
}
}