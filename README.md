# Easy Clean Morocco — site vitrine

Site vitrine statique bilingue (français / arabe) pour **Easy Clean Morocco**, entreprise d’hygiène professionnelle au Maroc.

Cinq expertises sont présentées :

1. Nettoyage industriel
2. Prestations de nettoyage
3. Produits et matériel de nettoyage
4. Équipements de sécurité
5. Dératisation et désinsectisation

Le site ne nécessite ni framework ni étape de build : HTML, CSS et JavaScript natifs.

---

## 1. Aperçu local

Depuis le dossier du site :

```bash
python -m http.server 8080
```

Puis ouvrir <http://localhost:8080/>.

> Node.js n’est pas requis. Un simple serveur statique convient (Apache, Nginx, GitHub Pages, Netlify, Vercel, etc.).

### Fichiers principaux

```text
easy-clean-morocco-site/
├── index.html                  # page d’accueil
├── mentions-legales.html       # mentions légales
├── confidentialite.html        # politique de confidentialité
├── robots.txt
├── sitemap.xml
├── README.md
└── assets/
    ├── css/style.css           # design, RTL et responsive
    ├── js/main.js              # interactions, langue, formulaire
    ├── favicon.svg
    ├── fonts/                  # Sora, Manrope, Cairo (woff2)
    └── img/                    # photographies locales
```

---

## 2. Coordonnées et informations à remplacer

Le site contient encore des **valeurs de démonstration**. Elles doivent être vérifiées ou remplacées avant toute mise en ligne.

| Élément | Valeur actuelle | Fichiers concernés |
|---|---|---|
| Téléphone fixe | `+212 5 00 00 00 00` | `index.html`, `mentions-legales.html`, `confidentialite.html` |
| WhatsApp | `+212 6 61 28 58 68` (fourni par le client) | `index.html`, `assets/js/main.js`, pages légales |
| E-mail | `contact@easycleanmorocco.ma` | toutes les pages |
| Adresse | `Casablanca, Maroc` | `index.html`, pages légales |
| Réseaux sociaux | liens `#` | `index.html` (carte contact) |
| Domaine / URL canonique | `https://www.easycleanmorocco.ma/` | balises `canonical`, Open Graph, `sitemap.xml`, `robots.txt` |
| Formulaire | ouvre WhatsApp, aucun backend | `assets/js/main.js`, `index.html` |

### Remplacer le numéro WhatsApp

Le numéro est présent à deux endroits principaux :

1. `assets/js/main.js` :

```js
const WHATSAPP_NUMBER = "212661285868";
```

2. Les liens `https://wa.me/...` dans `index.html` et les pages légales.

Format attendu : indicatif pays + numéro, sans `+`, sans espaces (ex. `212661285868`).

### Remplacer le téléphone, l’e-mail et l’adresse

Utiliser une recherche globale dans les fichiers HTML :

- `+212 5 00 00 00 00`
- `contact@easycleanmorocco.ma`
- `Casablanca, Maroc`

Penser à mettre à jour :

- le lien `tel:` correspondant ;
- le lien `mailto:` ;
- les données structurées JSON-LD dans `index.html` ;
- les mentions légales.

### Réseaux sociaux

Les icônes LinkedIn, Instagram et Facebook de la carte contact pointent vers `#`. Les remplacer par les URL réelles ou supprimer le bloc `.contact-card__socials` si les comptes n’existent pas encore.

---

## 3. Formulaire de devis

Le formulaire est **une démonstration sans backend** :

- validation côté client : nom, téléphone (au moins 8 chiffres), service et consentement obligatoires ;
- e-mail facultatif mais validé s’il est renseigné ;
- champ honeypot anti-spam ;
- à la validation, le site ouvre WhatsApp avec un message prérempli ;
- si le navigateur bloque la fenêtre, le lien WhatsApp est ouvert dans l’onglet courant.

Pour recevoir les demandes par e-mail ou les stocker en base :

1. créer un endpoint (PHP, Node, formulaire de service, etc.) ;
2. remplacer la fin du gestionnaire `submit` dans `assets/js/main.js` par un `fetch()` vers cet endpoint ;
3. mettre à jour la politique de confidentialité en conséquence (destinataires, durée de conservation, base légale) ;
4. ne jamais placer de clé secrète dans le JavaScript côté client.

Le formulaire n’envoie aucune donnée à un serveur Easy Clean Morocco : tant que WhatsApp n’est pas ouvert par le visiteur, rien n’est transmis.

---

## 4. Bilinguisme français / arabe

- Le français est la langue par défaut.
- Le bouton de langue bascule entre `fr` et `ar`.
- Le choix est mémorisé dans `localStorage` sous la clé `ecm-lang`.
- Le passage en arabe applique `lang="ar"` et `dir="rtl"` à `<html>`.
- Les textes traduits sont portés par des attributs :
  - `data-ar` : contenu HTML alternatif ;
  - `data-ar-ph` : placeholder alternatif ;
  - `data-ar-label` : `aria-label` alternatif.
- Les liens et les éléments HTML importants (ex. `<span class="eyebrow__dot">`) sont conservés lors du remplacement.

### Ajouter ou modifier une traduction

Exemple :

```html
<h3 data-ar="خدمات التنظيف">Prestations de nettoyage</h3>
```

Pour un texte contenant un lien :

```html
<p data-ar="... <a href='confidentialite.html'>سياسة الخصوصية</a> ...">
  ... <a href="confidentialite.html">Politique de confidentialité</a> ...
</p>
```

> Utiliser des guillemets simples à l’intérieur des attributs `data-ar` délimités par des guillemets doubles.

Les titres et descriptions des pages légales sont définis dans les attributs `data-title-fr`, `data-title-ar`, `data-desc-fr` et `data-desc-ar` de la balise `<body>`, puis appliqués par `main.js`.

Les nombres internationaux (téléphone, e-mail, unités) sont isolés avec `<bdi dir="ltr">` pour éviter les inversions en RTL.

---

## 5. Identité visuelle

### Couleurs

Définies dans `assets/css/style.css` (`:root`) :

| Variable | Valeur | Usage |
|---|---|---|
| `--navy` | `#07182E` | fonds sombres, titres |
| `--pink` | `#E6007E` | accent principal, boutons |
| `--blue` | `#0A5FBF` | accent secondaire, logo |
| `--teal` | `#00A99D` | validation, points positifs |
| `--paper` | `#F7F5F1` | fond clair |

### Logo

Le logo (deux feuilles roses cernées de bleu, cinq bulles roses glossy avec reflets blancs) est décliné en `<symbol id="ecm-mark">` dans le sprite SVG de chaque page, puis instancié via `<use href="#ecm-mark"/>` dans l’en-tête et le pied de page. Le dégradé `ecm-ball` (bulles) et `ecm-leaf` (feuilles) sont définis dans le même symbol. Le texte `EASY CLEAN` / `MOROCCO` est bleu avec un effet 3D (`text-shadow` en cascade) géré dans `assets/css/style.css` (`.brand__text`).

Pour remplacer le logo, modifier le symbol `ecm-mark` dans les trois pages HTML (ou le remplacer par un fichier SVG importé en `<img>`), et mettre à jour `assets/favicon.svg` en conséquence.

Le favicon se trouve dans `assets/favicon.svg`.

### Polices

Polices auto-hébergées dans `assets/fonts/` :

- **Sora** pour les titres latins ;
- **Manrope** pour le texte latin ;
- **Cairo** pour l’arabe.

Les fichiers sont préchargés dans le `<head>` pour limiter les changements de rendu.

---

## 6. Photographies

Les photographies sont des images de stock provenant de **Pexels**, téléchargées localement pour éviter les dépendances externes. Licence Pexels : utilisation gratuite, y compris commerciale ; attribution non obligatoire, mais appréciée.

| Fichier local | Photo Pexels |
|---|---|
| `hero-main.jpg` | <https://www.pexels.com/photo/9462761/> |
| `hero-detail.jpg` | <https://www.pexels.com/photo/6196223/> |
| `service-industriel.jpg` | <https://www.pexels.com/photo/32520873/> |
| `service-prestation.jpg` | <https://www.pexels.com/photo/6196692/> |
| `service-produits.jpg` | <https://www.pexels.com/photo/5217901/> |
| `service-securite.jpg` | <https://www.pexels.com/photo/15200451/> |
| `service-nuisibles.jpg` | <https://www.pexels.com/photo/19789837/> |
| `about-main.jpg` | <https://www.pexels.com/photo/34516670/> |
| `about-detail.jpg` | <https://www.pexels.com/photo/16898976/> |
| `products-feature.jpg` | <https://www.pexels.com/photo/10566507/> |

Pour une image de marque plus forte, remplacer ces photos par des photos réelles des équipes, chantiers, produits et véhicules Easy Clean Morocco. Conserver des noms de fichiers explicites et mettre à jour les attributs `alt`.

---

## 7. Contenus illustratifs à remplacer

Certains contenus sont **fictifs ou indicatifs** et ne doivent pas être publiés tels quels :

- les trois témoignages clients et leurs fonctions ;
- les statistiques `5`, `24 h`, `7j/7`, `1` (elles décrivent l’offre, pas des résultats mesurés) ;
- les mentions « produits et méthodes homologués », « équipes formées » : à vérifier et à pouvoir justifier ;
- les informations légales entre crochets : forme juridique, capital, ICE, RC, IF, CNSS, adresse exacte, responsable de publication, hébergeur, numéro CNDP.

Les pages légales sont des modèles. Elles doivent être relues et adaptées au statut réel de l’entreprise et à la réglementation applicable (notamment la loi 09-08 sur la protection des données personnelles au Maroc).

---

## 8. Avant publication — checklist

- [ ] Remplacer le téléphone fixe, l’e-mail et l’adresse.
- [ ] Vérifier le numéro WhatsApp affiché et le lien `wa.me`.
- [ ] Remplacer les liens sociaux `#`.
- [ ] Compléter les mentions légales (ICE, RC, IF, CNSS, forme juridique, capital, siège, hébergeur, responsable de publication).
- [ ] Compléter la politique de confidentialité (CNDP, durées, destinataires réels).
- [ ] Remplacer les témoignages par de vrais avis autorisés.
- [ ] Vérifier les allégations commerciales et les certifications.
- [ ] Remplacer les photos de stock par des photos de l’entreprise si possible.
- [ ] Mettre à jour le domaine dans `canonical`, Open Graph, JSON-LD, `robots.txt` et `sitemap.xml`.
- [ ] Vérifier l’affichage sur mobile, tablette et desktop, en français et en arabe.
- [ ] Tester le formulaire et l’ouverture de WhatsApp sur iOS et Android.
- [ ] Configurer HTTPS et les en-têtes de sécurité côté hébergeur.
- [ ] Si des outils d’analytics sont ajoutés : mettre à jour la politique de confidentialité et prévoir un consentement si nécessaire.
- [ ] Faire relire les pages légales par un professionnel du droit.

---

## 9. Accessibilité et performances

Déjà en place :

- structure sémantique (`header`, `main`, `section`, `footer`) ;
- lien d’évitement « Aller au contenu principal » ;
- navigation au clavier, fermeture du menu mobile avec `Échap` ;
- accordéon FAQ natif (`<details>` / `<summary>`) ;
- libellés de formulaire, messages d’erreur et `aria-live` ;
- attributs `alt` sur les images ;
- respect de `prefers-reduced-motion` ;
- images sous la ligne de flottaison en `loading="lazy"` ;
- polices locales et préchargées.

Points d’attention :

- les images de stock sont relativement lourdes ; les compresser en WebP/AVIF avant production ;
- vérifier les contrastes si les couleurs de marque changent ;
- tester avec un lecteur d’écran, notamment la version arabe ;
- le bouton de langue n’affiche que l’icône sur mobile : conserver un `aria-label` explicite.

---

## 10. Déploiement

Le site est entièrement statique. Déposer le contenu du dossier à la racine du domaine, puis vérifier :

- `index.html` sert bien la page d’accueil ;
- les pages `mentions-legales.html` et `confidentialite.html` sont accessibles ;
- le serveur renvoie les bons types MIME pour `.woff2`, `.svg`, `.jpg` ;
- les URL sans extension ou les redirections sont configurées si nécessaire ;
- le certificat HTTPS est actif ;
- le domaine configuré correspond aux URL canoniques.

---

## 11. Crédits

- Design et intégration : réalisés pour Easy Clean Morocco.
- Photographies : Pexels (voir section 6).
- Polices : Sora, Manrope et Cairo, distribuées sous SIL Open Font License.
- Icônes : SVG inline dessinés pour le projet.

Pour toute modification structurelle, conserver la cohérence des espacements, des arrondis, des couleurs et des deux versions linguistiques.
