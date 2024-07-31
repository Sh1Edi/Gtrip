import { Renderer2 } from '@angular/core';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { GmapService } from 'src/app/services/gmap.service';
import { Geolocation } from '@capacitor/geolocation';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  standalone: true

})
export class MapComponent  implements OnInit, OnDestroy {
  altitud: any = '';
  longitud: any = '';

 
  @ViewChild('map', {static: true}) mapElementRef!: ElementRef;

  //cordenadas
  source: any = { lat: this.altitud  , lng: this.longitud};

  //funciones 
  map: any;
  source_marker:any;
  source_marker2:any;
  mapCenterChangedListener: any;
  markerDragStartListener: any;
  markerDragEndListener: any;
  mapDragging = false;
  mapDragEndListener: any;
  mapDragStartListener: |any;

  constructor(
    private maps: GmapService,
    private renderer: Renderer2
  ) { }


  ngOnInit() {
        this.printCurrentPosition();
  }


  
  printCurrentPosition = async () => {
    const coordinates = await Geolocation.getCurrentPosition();
    this.altitud = coordinates.coords.latitude;
    this.longitud = coordinates.coords.longitude;
    console.log('Current position:', coordinates);
  };

  ngAfterViewInit(){
    this.printCurrentPosition();
    this.LoadMap();
  }

  async LoadMap() {
    
    try {
      const coordinates = await Geolocation.getCurrentPosition();
      console.log('posision actual:', coordinates);
      let googleMaps: any = await this.maps.loadGoogleMaps();
      const mapEl = this.mapElementRef.nativeElement;
      this.map = new googleMaps.Map(mapEl, {
        center: { lat: this.altitud, lng: this.longitud },
        disableDefaultUI: true,
        zoom: 14,
      });

      const sourceIconUrl = 'assets/icon/ubicacion.png';
      const source_position = new googleMaps.LatLng(this.altitud, this.longitud);

    

      const source_icon = {
        url: sourceIconUrl,
        scaledSize: new googleMaps.Size(50, 50), // scaled size
        origin: new googleMaps.Point(0, 0), // origin
        anchor: new googleMaps.Point(0, 0) // anchor
      };

   
      
      this.source_marker = new googleMaps.Marker({
        map: this.map,
        position: source_position,
        draggable: true,
        animation: googleMaps.Animation.DROP,
        icon: source_icon,
      });

   

      this.source_marker.setMap(this.map);
  
      this.map.setCenter(source_position);
      this.renderer.addClass(mapEl, 'visible');
      this.eventListeners(googleMaps);
    } catch(e) {
      console.log(e);
    }
  }

  eventListeners(googleMaps: { event: { addListener: (arg0: any, arg1: string, arg2: { (): void; (): void; (): void; (): void; }) => any; }; }) {
    //Add event listeners for map and marker
    this.mapDragStartListener = googleMaps.event.addListener(this.map, 'dragstart', () =>{
     this.mapDragging = true;
    });

  

    this.mapDragEndListener = googleMaps.event.addListener(this.map, 'dragend', () => {
      this.mapDragging = false;
      console.log('dragend: ', this.mapDragging);
      this.moveMarkerToCenter();
    });

  

    //this.mapCenterChangedListener = googleMaps.event.addListener(this.map, 'center_changed', () => {
    //  console.log('center_changed: ', this.mapDragging);
    //});

    this.markerDragStartListener = googleMaps.event.addListener(this.source_marker, 'dragstart', () =>{
      this.map.setOptions({draggable: false});
    });

 
    

    this.markerDragEndListener = googleMaps.event.addListener(this.source_marker, 'dragend', () =>{
      console.log('marker drag end: ', this.source_marker);
      this.map.setOptions({draggable: true});
      this.moveMapToMarkerAtCenter();
    })
   
  }
  moveMapToMarkerAtCenter() {
    const markerPosition = this.source_marker.getPosition();
    this.map.setCenter(markerPosition);
  }


  moveMarkerToCenter() {
    const center = this.map.getCenter();
    const markerPosition = {lat: center.lat(), lng: center.lng() };
    console.log(markerPosition);
    this.source_marker.setPosition(markerPosition);
  }




  ngOnDestroy(): void {
    //clearTimeout(this.centerChangedTimer);
    if (this.mapDragStartListener) {
      this.mapDragStartListener.remove();
    }

  

    if (this.mapDragEndListener) {
      this.mapDragEndListener.remove();
    }
 
    //if (this.mapCenterChangedListener) {
    //  this.mapCenterChangedListener.remove();
    //}

    if (this.markerDragStartListener) {
      this.markerDragStartListener.remove();
    }

    if (this.mapDragEndListener) {
      this.markerDragEndListener.remove();
    }
 

    //googleMaps.event.clearInstanceListeners(this.map);
    //googleMaps.event.clearInstanceListeners(this.source);

  }

}