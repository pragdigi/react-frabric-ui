import * as React from "react";
import styles from "./ReactWebPart.module.scss";
import { IReactWebPartProps } from "./IReactWebPartProps";
import { escape } from "@microsoft/sp-lodash-subset";

import { IColour } from "../IColour";
import { ColourList, IColourListProps } from "./ColourList";
import { IReactWebPartState } from "./IReactWebPartState";
import { SPHttpClient, SPHttpClientResponse } from "@microsoft/sp-http";

export default class ReactWebPart extends React.Component<
  IReactWebPartProps,
  IReactWebPartState
> {
  private _colours: IColour[] = [
    { id: 1, title: "purple" },
    { id: 2, title: "orange" },
    { id: 3, title: "grey" }
  ];
  constructor(props: IReactWebPartProps) {
    super(props);
    this.state = { colours: [] };
  }
  public render(): React.ReactElement<IReactWebPartProps> {
    return (
      <div className={styles.reactWebPart}>
        <div className={styles.container}>
          <div className={styles.row}>
            <div className={styles.column}>
              <span className={styles.title}>
                Welcome to SharePoint! + React
              </span>
              <ColourList colours={this.state.colours} onRemoveColour={this._removeColour} />
            </div>
          </div>
        </div>
      </div>
    );
  }
  private getColoursFromSpList(): Promise<IColour[]> {
    return new Promise<IColour[]>((resolve, reject) => {
      const endpoint: string = `${this.props.currentSiteUrl}/_api/lists/getbytitle('Colours')/items?$select=Id,Title`;
      this.props.spHttpClient.get(endpoint, SPHttpClient.configurations.v1)
        .then((response: SPHttpClientResponse) => {
          return response.json();
        })
        .then((jsonResponse: any) => {
          let spListItemColours: IColour[] = [];
          for (let index = 0; index < jsonResponse.value.length; index++) {
            spListItemColours.push({
              id: jsonResponse.value[index].Id,
              title: jsonResponse.value[index].Title
            });
  
            resolve(spListItemColours);
          }
        });
    });
  }  
  public componentDidMount(): void {
    this.getColoursFromSpList()
      .then((spListItemColours: IColour[]) => {
        this.setState({ colours: spListItemColours });
      });
  }  
  private _removeColour = (colourToRemove: IColour): void => {
    const newColours = this.state.colours.filter(colour => colour != colourToRemove);
    this.setState({ colours: newColours });
  }  
}
