/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

/* SystemJS module definition */
declare var module: NodeModule;
interface NodeModule {
  id: string;
}

declare module 'globalize' {
  const value: any;
  export default value;
}

declare module 'devextreme/localization/messages/*' {
  const value: any;
  export default value;
}

declare module 'devextreme-cldr-data/*' {
  const value: any;
  export default value;
}

declare var tinymce: any;

declare var echarts: any;
