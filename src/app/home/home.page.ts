import { Component } from '@angular/core';
import { ViewChild, ElementRef } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';

declare var google: any;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  map: any;

  @ViewChild('map', {read: ElementRef, static:false}) mapRef: ElementRef;

  constructor() {}

  async getCurrentLocation() {
    const coordinates = await Geolocation.getCurrentPosition();
    this.showMap(coordinates);
    console.log(coordinates);
  }

  addMarkerToMap(loc: any) {
    let position = new google.maps.LatLng(loc.coords.latitude, loc.coords.longitude);
    let mapMarker = new google.maps.Marker({
      position,
      title: "Current Location",
      latitude: loc.coords.latitude,
      longitude: loc.coords.longitude,
    })
    mapMarker.setMap(this.map);
  }

  async ionViewDidEnter() {
    this.getCurrentLocation()
  }

  showMap(loc: any) {
    const location = new google.maps.LatLng(loc.coords.latitude, loc.coords.longitude);
    const options = {
      center: location,
      zoom: 15,
      disableDefaultUI: true
    }

    this.map = new google.maps.Map(this.mapRef.nativeElement, options);
    this.addMarkerToMap(loc)
  }

}
