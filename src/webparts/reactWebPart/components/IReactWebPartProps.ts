export interface IReactWebPartProps {
  description: string;
  spHttpClient: SPHttpClient;
  currentSiteUrl: string;
}

import { SPHttpClient } from "@microsoft/sp-http";