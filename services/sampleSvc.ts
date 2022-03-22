import axios, { AxiosInstance } from "axios";
import { NasaPicture } from "./sample.types";

const apiKey = process.env.NEXT_PUBLIC_NASA_APIKEY;

export class SampleApi {
  client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: `https://api.nasa.gov/planetary`,
      method: "GET",
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    });
  }

  convertNasaPicture = (nasaPicture): NasaPicture => {
    const rawNasaPicture = nasaPicture;
    return {
      copyright:
        rawNasaPicture.copyright === undefined ? "" : rawNasaPicture.copyright,
      date: rawNasaPicture.date === undefined ? "" : rawNasaPicture.date,
      explanation:
        rawNasaPicture.explanation === undefined
          ? ""
          : rawNasaPicture.explanation,
      hdurl: rawNasaPicture.hdurl === undefined ? "" : rawNasaPicture.hdurl,
      media_type:
        rawNasaPicture.media_type === undefined
          ? ""
          : rawNasaPicture.media_type,
      service_version:
        rawNasaPicture.service_version === undefined
          ? ""
          : rawNasaPicture.service_version,
      title: rawNasaPicture.title === undefined ? "" : rawNasaPicture.title,
      url: rawNasaPicture.url === undefined ? "" : rawNasaPicture.url,
    };
  };

  async getNasaPicture(count: number): Promise<Array<NasaPicture>> {
    return await this.client
      .get(`/apod?api_key=${apiKey}&count=${count}&thumbs=true`)
      .then((res) => {
        if (res.status === 200) {
          const nasaPictures = new Array<NasaPicture>();
          res.data.map((nasaPicture) => {
            const convert = this.convertNasaPicture(nasaPicture);
            nasaPictures.push(convert);
          });
          return nasaPictures;
        }
        return [];
      });
  }
}
