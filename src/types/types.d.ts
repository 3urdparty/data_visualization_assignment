export interface Datum {
  id: number;
  region: number;
  name: string;
  majors_in_icis_npdes: number;
  non_majors_in_icis_npdes: number;
  major_pollutant_loadings: number;
  non_major_pollutant_loadings: number;
  major_pollutant_loadings_percentage: number;
  non_majors_pollutant_loadings: number;
  major_pollutants_pounds: number;
  non_major_total_pollutants_pounds: number;
  major_toxic_weighted_pounds: number;
  non_major_toxic_weighted_pounds: number;
  date: Date;
}
