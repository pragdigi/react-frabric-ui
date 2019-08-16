import * as React from "react";
import styles from "./ReactWebPart.module.scss";
import { IReactWebPartProps } from "./IReactWebPartProps";
import { escape } from "@microsoft/sp-lodash-subset";

import { IColour } from "../IColour";
import { ColourList, IColourListProps } from "./ColourList";

export default class ReactWebPart extends React.Component<
  IReactWebPartProps,
  {}
> {
  private _colours: IColour[] = [
    { id: 1, title: "purple" },
    { id: 2, title: "orange" },
    { id: 3, title: "grey" }
  ];

  public render(): React.ReactElement<IReactWebPartProps> {
    return (
      <div className={styles.reactWebPart}>
        <div className={styles.container}>
          <div className={styles.row}>
            <div className={styles.column}>
              <span className={styles.title}>
                Welcome to SharePoint! + React
              </span>
              <ColourList colours={this._colours} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
