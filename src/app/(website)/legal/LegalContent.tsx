'use client'

import React, { useState } from 'react'
import styled from 'styled-components'

// Utilisation des design tokens du système
const Container = styled.div`
  min-height: 100vh;
  padding: var(--spacing-16) var(--spacing-6);
  background-color: var(--color-gray-50);
  
  @media (max-width: var(--breakpoint-md)) {
    padding: var(--spacing-8) var(--spacing-4);
  }
`

const Content = styled.div`
  max-width: var(--max-width-4xl);
  margin: 0 auto;
`

const Header = styled.div`
  text-align: center;
  margin-bottom: var(--spacing-12);
`

const Title = styled.h1`
  font-size: var(--font-size-4xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-gray-900);
  margin-bottom: var(--spacing-4);
  
  @media (max-width: var(--breakpoint-md)) {
    font-size: var(--font-size-3xl);
  }
`

const LastUpdated = styled.p`
  color: var(--color-gray-600);
  font-size: var(--font-size-sm);
`

const Navigation = styled.nav`
  background: var(--color-white);
  padding: var(--spacing-6);
  border-radius: var(--border-radius-xl);
  box-shadow: var(--shadow-md);
  margin-bottom: var(--spacing-8);
  border: 1px solid var(--color-gray-200);
`

const NavTitle = styled.h2`
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  color: var(--color-gray-900);
  margin-bottom: var(--spacing-4);
`

const NavList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--spacing-2);
`

const NavItem = styled.li`
  a {
    display: block;
    padding: var(--spacing-2) var(--spacing-3);
    color: var(--color-primary);
    text-decoration: none;
    border-radius: var(--border-radius-md);
    transition: var(--transition-base);
    font-size: var(--font-size-sm);
    
    &:hover {
      background: var(--color-primary);
      color: var(--color-white);
    }
  }
`

const Section = styled.section`
  background: var(--color-white);
  padding: var(--spacing-8);
  border-radius: var(--border-radius-xl);
  box-shadow: var(--shadow-md);
  margin-bottom: var(--spacing-8);
  border: 1px solid var(--color-gray-200);
`

const SectionTitle = styled.h2`
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-gray-900);
  margin-bottom: var(--spacing-6);
  padding-bottom: var(--spacing-3);
  border-bottom: 2px solid var(--color-primary);
`

const SubTitle = styled.h3`
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-semibold);
  color: var(--color-gray-800);
  margin: var(--spacing-6) 0 var(--spacing-4);
`

const Paragraph = styled.p`
  color: var(--color-gray-700);
  line-height: var(--line-height-relaxed);
  margin-bottom: var(--spacing-4);
  
  &:last-child {
    margin-bottom: 0;
  }
`

const List = styled.ul`
  color: var(--color-gray-700);
  line-height: var(--line-height-relaxed);
  margin-bottom: var(--spacing-4);
  padding-left: var(--spacing-6);
  
  li {
    margin-bottom: var(--spacing-2);
  }
`

const ContactInfo = styled.div`
  background: var(--color-primary);
  color: var(--color-white);
  padding: var(--spacing-6);
  border-radius: var(--border-radius-lg);
  margin-top: var(--spacing-6);
  
  h4 {
    font-size: var(--font-size-lg);
    font-weight: var(--font-weight-semibold);
    margin-bottom: var(--spacing-3);
  }
  
  p {
    margin-bottom: var(--spacing-2);
    opacity: 0.9;
    
    &:last-child {
      margin-bottom: 0;
    }
  }
`

export default function LegalContent() {
  return (
    <Container>
      <Content>
        <Header>
          <Title>Mentions Légales & Confidentialité</Title>
          <LastUpdated>Dernière mise à jour : 4 novembre 2024</LastUpdated>
        </Header>

        <Navigation>
          <NavTitle>Sommaire</NavTitle>
          <NavList>
            <NavItem><a href="#mentions-legales">Mentions Légales</a></NavItem>
            <NavItem><a href="#politique-confidentialite">Politique de Confidentialité</a></NavItem>
            <NavItem><a href="#cookies">Gestion des Cookies</a></NavItem>
            <NavItem><a href="#conditions-utilisation">Conditions d'Utilisation</a></NavItem>
            <NavItem><a href="#propriete-intellectuelle">Propriété Intellectuelle</a></NavItem>
            <NavItem><a href="#contact">Contact</a></NavItem>
          </NavList>
        </Navigation>

        <Section id="mentions-legales">
          <SectionTitle>📋 Mentions Légales</SectionTitle>
          
          <SubTitle>Éditeur du site</SubTitle>
          <Paragraph>
            <strong>Votre Entreprise</strong><br />
            Société par actions simplifiée au capital de 10 000 €<br />
            Siège social : [Adresse complète]<br />
            RCS : [Ville] [Numéro]<br />
            SIRET : [Numéro SIRET]<br />
            TVA intracommunautaire : [Numéro TVA]
          </Paragraph>

          <SubTitle>Directeur de publication</SubTitle>
          <Paragraph>
            [Nom du directeur de publication]<br />
            Email : contact@votreentreprise.com
          </Paragraph>

          <SubTitle>Hébergement</SubTitle>
          <Paragraph>
            Ce site est hébergé par :<br />
            <strong>Vercel Inc.</strong><br />
            340 S Lemon Ave #4133<br />
            Walnut, CA 91789, États-Unis
          </Paragraph>
        </Section>

        <Section id="politique-confidentialite">
          <SectionTitle>🔒 Politique de Confidentialité</SectionTitle>
          
          <SubTitle>Collecte des données</SubTitle>
          <Paragraph>
            Nous collectons uniquement les données nécessaires au bon fonctionnement de nos services :
          </Paragraph>
          <List>
            <li>Données de contact (nom, email, téléphone) via nos formulaires</li>
            <li>Données de navigation (cookies techniques)</li>
            <li>Données d'analyse anonymisées (Google Analytics)</li>
          </List>

          <SubTitle>Utilisation des données</SubTitle>
          <Paragraph>
            Vos données personnelles sont utilisées pour :
          </Paragraph>
          <List>
            <li>Répondre à vos demandes de contact</li>
            <li>Améliorer nos services</li>
            <li>Respecter nos obligations légales</li>
          </List>

          <SubTitle>Vos droits RGPD</SubTitle>
          <Paragraph>
            Conformément au RGPD, vous disposez des droits suivants :
          </Paragraph>
          <List>
            <li>Droit d'accès à vos données</li>
            <li>Droit de rectification</li>
            <li>Droit à l'effacement</li>
            <li>Droit à la portabilité</li>
            <li>Droit d'opposition</li>
          </List>
        </Section>

        <Section id="cookies">
          <SectionTitle>🍪 Gestion des Cookies</SectionTitle>
          
          <SubTitle>Cookies utilisés</SubTitle>
          <Paragraph>
            Notre site utilise différents types de cookies :
          </Paragraph>
          <List>
            <li><strong>Cookies techniques</strong> : Nécessaires au fonctionnement du site</li>
            <li><strong>Cookies d'analyse</strong> : Google Analytics (anonymisés)</li>
            <li><strong>Cookies de préférences</strong> : Sauvegarde de vos choix</li>
          </List>

          <SubTitle>Gestion des cookies</SubTitle>
          <Paragraph>
            Vous pouvez à tout moment modifier vos préférences de cookies via les paramètres de votre navigateur 
            ou en utilisant notre outil de gestion des cookies.
          </Paragraph>
        </Section>

        <Section id="conditions-utilisation">
          <SectionTitle>📜 Conditions d'Utilisation</SectionTitle>
          
          <SubTitle>Acceptation des conditions</SubTitle>
          <Paragraph>
            L'utilisation de ce site implique l'acceptation pleine et entière des conditions générales d'utilisation 
            décrites ci-après. Ces conditions d'utilisation sont susceptibles d'être modifiées ou complétées à tout moment.
          </Paragraph>

          <SubTitle>Utilisation du site</SubTitle>
          <Paragraph>
            Le site est accessible gratuitement à tout utilisateur ayant un accès à Internet. 
            Tous les frais supportés par l'utilisateur pour accéder au service (matériel informatique, logiciels, 
            connexion Internet, etc.) sont à sa charge.
          </Paragraph>

          <SubTitle>Responsabilité</SubTitle>
          <Paragraph>
            Les informations contenues sur ce site sont aussi précises que possible et le site est périodiquement remis à jour, 
            mais peut toutefois contenir des inexactitudes, des omissions ou des lacunes.
          </Paragraph>
        </Section>

        <Section id="propriete-intellectuelle">
          <SectionTitle>©️ Propriété Intellectuelle</SectionTitle>
          
          <SubTitle>Droits d'auteur</SubTitle>
          <Paragraph>
            L'ensemble de ce site relève de la législation française et internationale sur le droit d'auteur et la propriété intellectuelle. 
            Tous les droits de reproduction sont réservés, y compris pour les documents téléchargeables et les représentations iconographiques et photographiques.
          </Paragraph>

          <SubTitle>Utilisation autorisée</SubTitle>
          <Paragraph>
            La reproduction de tout ou partie de ce site sur un support électronique quel qu'il soit est formellement interdite 
            sauf autorisation expresse du directeur de la publication.
          </Paragraph>
        </Section>

        <Section id="contact">
          <SectionTitle>📞 Contact</SectionTitle>
          
          <Paragraph>
            Pour toute question concernant ces mentions légales ou notre politique de confidentialité, 
            vous pouvez nous contacter :
          </Paragraph>

          <ContactInfo>
            <h4>Informations de Contact</h4>
            <p><strong>Email :</strong> legal@votreentreprise.com</p>
            <p><strong>Téléphone :</strong> +33 1 23 45 67 89</p>
            <p><strong>Adresse :</strong> [Adresse complète]</p>
            <p><strong>Horaires :</strong> Lundi-Vendredi 9h-18h</p>
          </ContactInfo>
        </Section>
      </Content>
    </Container>
  )
}
