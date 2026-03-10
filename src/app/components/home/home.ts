import { Component } from '@angular/core';
import { Header } from "../header/header";
import { Card } from "../card/card";
import { LeftPanel } from "../left-panel/left-panel";
import { RightPanel } from "../right-panel/right-panel";

@Component({
  selector: 'app-home',
  imports: [Header, Card, LeftPanel, RightPanel],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

}
