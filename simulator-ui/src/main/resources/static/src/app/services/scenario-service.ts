import {Injectable} from "@angular/core";
import {Headers, Http, Response} from "@angular/http";
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
import {Scenario, ScenarioParameter} from "../model/scenario";

@Injectable()
export class ScenarioService {

    constructor(private http: Http) {
    }

    private serviceUrl = 'api/scenario';

    getScenarios(): Observable<Scenario[]> {
        return this.retrieveScenarios("");
    }

    getActiveScenarios(): Observable<Scenario[]> {
        return this.retrieveScenarios("?filter=active");
    }

    getScenario(name: string): Observable<Scenario> {
        return this.retrieveScenarios("").map(scenarios => this.filterScenariosByName(name, scenarios)).catch(this.handleError);
    }

    private filterScenariosByName(name: string, scenarios: Scenario[]): Scenario {
        return scenarios.filter(scenario => scenario.name === name)[0]
    }

    getScenarioParameters(name: string): Observable<ScenarioParameter[]> {
        return this.http.get(this.serviceUrl + "/parameters/" + name)
            .map(
                this.extractScenarioParameterData
            )
            .catch(
                this.handleError
            );
    }

    launchScenario(name: string, scenarioParameters: ScenarioParameter[]): Observable<any> {
        let headers = new Headers({'Content-Type': 'application/json'});

        return this.http.post(this.serviceUrl + "/launch/" + name, JSON.stringify(scenarioParameters), {headers: headers})
            .map(
                this.extractExecutionId
            )
            .catch(
                this.handleError
            );
    }

    private extractExecutionId(res: Response) {
        return <number> res.json();
    }

    private retrieveScenarios(filter: string): Observable<Scenario[]> {
        return this.http.get(this.serviceUrl + filter)
            .map(
                this.extractScenarioData
            )
            .catch(
                this.handleError
            );
    }

    private extractScenarioData(res: Response) {
        var scenarios = <Scenario[]> res.json();
        if (scenarios) {
            return scenarios;
        }
        return [];
    }

    private extractScenarioParameterData(res: Response) {
        var scenarioParameters = <ScenarioParameter[]> res.json();
        if (scenarioParameters) {
            return scenarioParameters;
        }
        return [];
    }

    private handleError(error: any) {
        // TODO return Error Object
        let errMsg = (error.message) ? error.message : error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
}
