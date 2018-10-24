declare interface IMyFavMoviesWebPartStrings {
  PropertyPaneDescription: string;
  PropertyPaneMovies: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
  MovieNameFieldLabel: string;
  MovieYearFieldLabel: string;
}

declare module 'MyFavMoviesWebPartStrings' {
  const strings: IMyFavMoviesWebPartStrings;
  export = strings;
}
