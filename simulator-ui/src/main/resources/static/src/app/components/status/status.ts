import {Component, OnInit, OnDestroy} from '@angular/core';
import {Router} from "@angular/router";
import {SummaryService} from '../../services/summary-service';
import {Summary} from '../../model/scenario';
import {AppInfoService} from "../../services/appinfo-service";
import {Simulator} from "../../model/simulator";

@Component({
    moduleId: module.id,
    templateUrl: 'status.html',
    styleUrls: ['status.css'],
})
export class StatusComponent implements OnInit, OnDestroy {

    simulator: Simulator;

    summary: Summary;
    active: number;
    errorMessage: string;

    autoRefreshId: number;

    constructor(
        private router: Router,
        private summaryService: SummaryService,
        private appInfoService: AppInfoService) {
    }

    ngOnInit() {
        this.getSimulatorInfo();
        this.getSummary();
        this.getActive();

        this.autoRefreshId = window.setInterval(() => { this.refreshStatus() }, 2000);
    }

    ngOnDestroy(): void {
        window.clearInterval(this.autoRefreshId);
    }

    getSimulatorInfo() {
        this.appInfoService.getSimulatorInfo()
            .subscribe(
                simulator => this.simulator = simulator,
                error => this.errorMessage = <any>error
            );
    }

    getSummary() {
        this.summaryService.getSummary()
            .subscribe(
                summary => this.summary = summary,
                error => this.errorMessage = <any>error
            );
    }

    getActive() {
        this.summaryService.getCountActiveScenarios()
            .subscribe(
                active => this.active = active,
                error => this.errorMessage = <any>error
            );
    }

    onSelect(status: string) {
        this.router.navigate(['activity', { status: status}]);
    }

    clearStatus() {
        this.summaryService.resetSummary()
            .subscribe(
                summary => this.summary = summary,
                error => this.errorMessage = <any>error
            );
    }

    refreshStatus() {
        this.getActive();
        this.getSummary();
    }

}
