import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { BrainConfigurationModel, SensorModel, SensorType } from "src/app/shared/models/configuration.model";
import { APIService } from "src/app/shared/services/api.service";

@Injectable({
    providedIn: 'root'
})
export class ConfigurationService {

    constructor(private api: APIService) { }

    getBrains(): Observable<BrainConfigurationModel[]> {
        return this.api.get<{ [key: string]: BrainConfigurationModel }>('/brains/configuration')
            .pipe(
                map((result) => {
                    const brains: BrainConfigurationModel[] = [];
                    for (const configuration of Object.values(result)) {
                        brains.push(configuration);
                    }
                    return brains;
                })
            )
    }

    createBrain(brain: BrainConfigurationModel): Observable<BrainConfigurationModel> {
        return this.api.post<BrainConfigurationModel>('/brain/configuration', brain);
    }

    updateBrain(brain: BrainConfigurationModel): Observable<BrainConfigurationModel> {
        return this.api.put<BrainConfigurationModel>('/brain/' + brain.name + '/configuration', brain);
    }

    deleteBrainConfiguration(brainConfiguration: BrainConfigurationModel): Observable<{ name: string }> {
        return this.api.delete('/brain/' + brainConfiguration.name + '/configuration');
    }

    getSensors(): Observable<SensorModel[]> {
        return this.api.get<{ [key: string]: SensorType }>('/sensors')
            .pipe(
                map((result) => {
                    const sensors: SensorModel[] = [];
                    for (const [name, typed] of Object.entries(result)) {
                        sensors.push({ name: name, typed: typed })
                    }
                    return sensors;
                })
            )
    }

    createSensor(sensor: SensorModel): Observable<SensorModel> {
        return this.api.post('/sensor', sensor);
    }


    updateSensor(sensor: SensorModel): Observable<SensorModel> {
        return this.api.put('/sensor/' + sensor.name, sensor);
    }


    deleteSensor(sensor: SensorModel): Observable<{ name: string }> {
        return this.api.delete('/sensor/' + sensor.name);
    }
}