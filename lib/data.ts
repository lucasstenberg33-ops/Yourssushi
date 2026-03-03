import { readFileSync, writeFileSync } from 'fs';
import path from 'path';

const dataDir = path.join(process.cwd(), 'data');

function readJson(filename: string) {
  const filePath = path.join(dataDir, filename);
  const raw = readFileSync(filePath, 'utf-8');
  return JSON.parse(raw);
}

function writeJson(filename: string, data: unknown) {
  const filePath = path.join(dataDir, filename);
  writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
}

export function getMenu() {
  return readJson('menu.json');
}

export function saveMenu(data: unknown) {
  writeJson('menu.json', data);
}

export function getHours() {
  return readJson('hours.json');
}

export function saveHours(data: unknown) {
  writeJson('hours.json', data);
}

export function getContact() {
  return readJson('contact.json');
}

export function saveContact(data: unknown) {
  writeJson('contact.json', data);
}

export function getAbout() {
  return readJson('about.json');
}

export function saveAbout(data: unknown) {
  writeJson('about.json', data);
}
