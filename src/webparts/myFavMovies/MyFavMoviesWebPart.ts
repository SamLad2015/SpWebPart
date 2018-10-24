import 'reflect-metadata';
require('zone.js');
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';
import {escape} from '@microsoft/sp-lodash-subset';
import * as strings from 'MyFavMoviesWebPartStrings';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { MoviesModule } from '../../app/MoviesModule';
import { IMyFavMoviesProps } from './MyFavMoviesWebProps';
import { Version } from '@microsoft/sp-core-library';
import { MoviesComponent } from "../../../lib/app/MoviesComponent";
import {AfterViewInit, ViewChild} from '@angular/core';

export default class MyFavMoviesWebPart extends BaseClientSideWebPart<IMyFavMoviesProps> implements AfterViewInit {
  @ViewChild(MoviesComponent) myMovie : MoviesComponent;
  public render(): void {
    this.domElement.innerHTML = `
    <h2>${escape(this.properties.description)}</h2>
    <my-movies #myMovie></my-movies>
    `;
    platformBrowserDynamic().bootstrapModule(MoviesModule);
  }

  public ngAfterViewInit(): void {
     this.myMovie.addMovies(this.properties.movies);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    const pages = [
      {
        header: {
          description: strings.PropertyPaneDescription
        },
        groups: [{
          groupName: strings.PropertyPaneDescription,
          groupFields: [PropertyPaneTextField('description', {
            label: strings.DescriptionFieldLabel
          })]
        }]
      }
    ];

    this.properties.movies.forEach((movie, index)=>{
      pages.push({
        header: {
          description : strings.BasicGroupName + (index + 1)
        },
        groups: [this.addGrpFields(index)]
      });
    });

    return {
      pages: pages
    };
  }

  private addGrpFields(index: number): any{
    const grpFields = [];
    grpFields.push(PropertyPaneTextField('movies[' + index + '].name', {
        label: strings.MovieNameFieldLabel
    }));
    grpFields.push(PropertyPaneTextField('movies[' + index + '].year', {
        label: strings.MovieYearFieldLabel
    }));
    return {groupName: strings.BasicGroupName + (index + 1), groupFields: grpFields};
  }
}
