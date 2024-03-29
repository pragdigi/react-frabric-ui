import * as React from 'react';
import {IColour} from '../IColour';
import {List } from 'office-ui-fabric-react/lib/List';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';

export type RemoveColourCallback = (colour: IColour) => void;

export interface IColourListProps {
    colours: IColour[];
    onRemoveColour: RemoveColourCallback;
}

export class ColourList extends React.Component <IColourListProps, {}> {
public render(): React.ReactElement<IColourListProps>{
    return(

<List items={ this.props.colours }
onRenderCell={ this._onRenderListCell }
/>
    );
}
private _onRenderListCell = (colour: IColour, index: number | undefined ): JSX.Element => {

    return ( <div>
      { colour.title } <br />
    <DefaultButton text="delete" data={colour.id} onClick={ () => this._onButtonClick(colour) } />  
    </div>
    );
    }
    private _onButtonClick(colour: IColour): void {
        this.props.onRemoveColour(colour);
    }
}