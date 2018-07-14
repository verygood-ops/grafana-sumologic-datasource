import './query_parameter_ctrl';
import { QueryCtrl } from 'grafana/app/plugins/sdk';
import './mode-sumologic';
import './snippets/sumologic';

export class SumologicQueryCtrl extends QueryCtrl {
  constructor($scope, $injector) {
    super($scope, $injector);
  }
}

SumologicQueryCtrl.templateUrl = 'partials/query.editor.html';
