// Ce fichier contient toutes les étapes du formulaire
// À copier dans page.tsx entre <Form> et </Form>

export const STEPS_CODE = `
      <StepsIndicator>
        {[1, 2, 3, 4, 5, 6].map(num => (
          <StepDot key={num} $active={step === num} $completed={step > num}>
            {step > num ? '✓' : num}
          </StepDot>
        ))}
      </StepsIndicator>

      <StepInfo>
        <StepNumber>Étape {step}/6</StepNumber>
        <StepDescription>
          {step === 1 && 'Choisissez le type de site que vous souhaitez créer'}
          {step === 2 && 'Renseignez les informations de base de votre site'}
          {step === 3 && 'Sélectionnez les pages à créer'}
          {step === 4 && 'Configurez les blocs pour chaque page'}
          {step === 5 && 'Personnalisez le style et les couleurs'}
          {step === 6 && 'Vérifiez et validez votre configuration'}
        </StepDescription>
      </StepInfo>

      <Form>
        {/* ÉTAPE 1: Type de projet */}
        {step === 1 && (
          <Step>
            <StepTitle>📋 Type de projet</StepTitle>
            <StepSubtitle>Sélectionnez le type de site qui correspond le mieux à vos besoins</StepSubtitle>
            <Grid>
              {projectTypes.map(type => (
                <ProjectCard
                  key={type.id}
                  $selected={config.projectType === type.id}
                  onClick={() => updateConfig('projectType', type.id)}
                >
                  <CardIcon>{type.icon}</CardIcon>
                  <CardTitle>{type.name}</CardTitle>
                  <CardDescription>{type.description}</CardDescription>
                </ProjectCard>
              ))}
            </Grid>
          </Step>
        )}

        {/* ÉTAPE 2: Informations de base */}
        {step === 2 && (
          <Step>
            <StepTitle>📝 Informations de base</StepTitle>
            <StepSubtitle>Ces informations seront utilisées pour générer le contenu de votre site</StepSubtitle>
            
            <FormGroup>
              <Label>Nom de votre entreprise/site *</Label>
              <Input
                placeholder="Ex: Studio Créatif, Restaurant Le Gourmet..."
                value={config.siteName}
                onChange={e => updateConfig('siteName', e.target.value)}
                required
              />
            </FormGroup>

            <FormGroup>
              <Label>Description courte *</Label>
              <TextArea
                placeholder="Décrivez votre activité en 1-2 phrases. Ex: Nous sommes une agence web spécialisée dans la création de sites modernes et performants."
                value={config.siteDescription}
                onChange={e => updateConfig('siteDescription', e.target.value)}
                rows={3}
                required
              />
            </FormGroup>

            <FormGroup>
              <Label>Secteur d'activité *</Label>
              <Input
                placeholder="Ex: Technologie, Santé, Restauration, Services..."
                value={config.industry}
                onChange={e => updateConfig('industry', e.target.value)}
                required
              />
            </FormGroup>

            <FormGroup>
              <Label>Public cible</Label>
              <Input
                placeholder="Ex: Entreprises B2B, Particuliers, Professionnels de la santé..."
                value={config.targetAudience}
                onChange={e => updateConfig('targetAudience', e.target.value)}
              />
            </FormGroup>
          </Step>
        )}

        {/* ÉTAPE 3: Sélection des pages */}
        {step === 3 && (
          <Step>
            <StepTitle>📄 Pages à créer</StepTitle>
            <StepSubtitle>Sélectionnez les pages que vous souhaitez inclure dans votre site</StepSubtitle>
            
            <PagesGrid>
              {defaultPages.map(page => (
                <PageCard
                  key={page.id}
                  $selected={isPageSelected(page.id)}
                  $required={page.required}
                  onClick={() => !page.required && togglePage(page.id)}
                >
                  <PageCardHeader>
                    <PageIcon>{page.icon}</PageIcon>
                    <PageName>{page.name}</PageName>
                    {page.required && <RequiredBadge>Requis</RequiredBadge>}
                  </PageCardHeader>
                  <PageDescription>{page.description}</PageDescription>
                  {isPageSelected(page.id) && (
                    <PageBlockCount>
                      {getPageBlocks(page.id).length} bloc(s) configuré(s)
                    </PageBlockCount>
                  )}
                </PageCard>
              ))}
            </PagesGrid>

            {config.pages.length > 0 && (
              <SelectedPagesInfo>
                ✅ {config.pages.length} page(s) sélectionnée(s)
              </SelectedPagesInfo>
            )}
          </Step>
        )}

        {/* ÉTAPE 4: Configuration des blocs par page */}
        {step === 4 && (
          <Step>
            <StepTitle>🧩 Configuration des blocs</StepTitle>
            <StepSubtitle>Configurez les blocs pour chaque page sélectionnée</StepSubtitle>

            {config.pages.length === 0 ? (
              <EmptyState>
                <EmptyIcon>📄</EmptyIcon>
                <EmptyText>Aucune page sélectionnée</EmptyText>
                <EmptySubtext>Retournez à l'étape précédente pour sélectionner des pages</EmptySubtext>
              </EmptyState>
            ) : (
              <>
                <PageSelector>
                  {config.pages.map((page: any) => (
                    <PageTab
                      key={page.id}
                      $active={currentPageConfig === page.id}
                      onClick={() => setCurrentPageConfig(page.id)}
                    >
                      {defaultPages.find(p => p.id === page.id)?.icon} {page.name}
                      <PageTabBadge>{page.blocks.length}</PageTabBadge>
                    </PageTab>
                  ))}
                </PageSelector>

                {currentPageConfig && (
                  <BlockConfiguration>
                    <BlockConfigHeader>
                      <h3>Blocs pour la page "{config.pages.find((p: any) => p.id === currentPageConfig)?.name}"</h3>
                      <BlockConfigSubtext>Ajoutez et organisez les blocs dans l'ordre souhaité</BlockConfigSubtext>
                    </BlockConfigHeader>

                    <CategoryFilter>
                      <CategoryButton
                        $active={selectedCategory === 'all'}
                        onClick={() => setSelectedCategory('all')}
                      >
                        🌐 Tous
                      </CategoryButton>
                      {blockCategories.map(cat => (
                        <CategoryButton
                          key={cat.id}
                          $active={selectedCategory === cat.id}
                          onClick={() => setSelectedCategory(cat.id)}
                        >
                          {cat.icon} {cat.name}
                        </CategoryButton>
                      ))}
                    </CategoryFilter>

                    <BlocksGrid>
                      {availableBlocks
                        .filter(block => selectedCategory === 'all' || block.category === selectedCategory)
                        .map(block => (
                          <BlockCard
                            key={block.id}
                            onClick={() => addBlockToPage(currentPageConfig, block.id)}
                          >
                            <BlockIcon>{block.icon}</BlockIcon>
                            <BlockName>{block.name}</BlockName>
                            <BlockDescription>{block.description}</BlockDescription>
                          </BlockCard>
                        ))
                      }
                    </BlocksGrid>

                    {getPageBlocks(currentPageConfig).length > 0 && (
                      <SelectedBlocks>
                        <SelectedBlocksTitle>📋 Blocs sélectionnés ({getPageBlocks(currentPageConfig).length})</SelectedBlocksTitle>
                        {getPageBlocks(currentPageConfig).map((block: any, index: number) => (
                          <SelectedBlock key={index}>
                            <BlockOrder>{index + 1}</BlockOrder>
                            <SelectedBlockInfo>
                              <SelectedBlockName>{block.name}</SelectedBlockName>
                            </SelectedBlockInfo>
                            <BlockActions>
                              {index > 0 && (
                                <BlockActionButton
                                  onClick={() => moveBlock(currentPageConfig, index, 'up')}
                                  title="Monter"
                                >
                                  ↑
                                </BlockActionButton>
                              )}
                              {index < getPageBlocks(currentPageConfig).length - 1 && (
                                <BlockActionButton
                                  onClick={() => moveBlock(currentPageConfig, index, 'down')}
                                  title="Descendre"
                                >
                                  ↓
                                </BlockActionButton>
                              )}
                              <BlockActionButton
                                onClick={() => removeBlockFromPage(currentPageConfig, index)}
                                title="Supprimer"
                                $danger
                              >
                                ×
                              </BlockActionButton>
                            </BlockActions>
                          </SelectedBlock>
                        ))}
                      </SelectedBlocks>
                    )}
                  </BlockConfiguration>
                )}
              </>
            )}
          </Step>
        )}

        {/* ÉTAPE 5: Style et préférences */}
        {step === 5 && (
          <Step>
            <StepTitle>🎨 Style et préférences</StepTitle>
            <StepSubtitle>Personnalisez l'apparence de votre site</StepSubtitle>
            
            <FormGroup>
              <Label>Style de design</Label>
              <StyleGrid>
                {designStyles.map(style => (
                  <StyleCard
                    key={style.id}
                    $selected={config.designStyle === style.id}
                    onClick={() => updateConfig('designStyle', style.id)}
                  >
                    <CardIcon>{style.icon}</CardIcon>
                    <CardTitle>{style.name}</CardTitle>
                    <CardDescription>{style.description}</CardDescription>
                  </StyleCard>
                ))}
              </StyleGrid>
            </FormGroup>

            <ColorSection>
              <FormGroup>
                <Label>Couleur principale</Label>
                <ColorPicker>
                  <ColorInput
                    type="color"
                    value={config.primaryColor}
                    onChange={e => updateConfig('primaryColor', e.target.value)}
                  />
                  <Input
                    type="text"
                    value={config.primaryColor}
                    onChange={e => updateConfig('primaryColor', e.target.value)}
                    placeholder="#667eea"
                  />
                </ColorPicker>
              </FormGroup>

              <FormGroup>
                <Label>Couleur secondaire</Label>
                <ColorPicker>
                  <ColorInput
                    type="color"
                    value={config.secondaryColor}
                    onChange={e => updateConfig('secondaryColor', e.target.value)}
                  />
                  <Input
                    type="text"
                    value={config.secondaryColor}
                    onChange={e => updateConfig('secondaryColor', e.target.value)}
                    placeholder="#764ba2"
                  />
                </ColorPicker>
              </FormGroup>
            </ColorSection>

            <FormGroup>
              <Label>Fonctionnalités avancées</Label>
              <FeaturesGrid>
                <FeatureCheckbox>
                  <input
                    type="checkbox"
                    checked={config.features.animations}
                    onChange={e => updateConfig('features', { ...config.features, animations: e.target.checked })}
                  />
                  <span>✨ Animations fluides</span>
                </FeatureCheckbox>
                <FeatureCheckbox>
                  <input
                    type="checkbox"
                    checked={config.features.seo}
                    onChange={e => updateConfig('features', { ...config.features, seo: e.target.checked })}
                  />
                  <span>🔍 Optimisation SEO</span>
                </FeatureCheckbox>
                <FeatureCheckbox>
                  <input
                    type="checkbox"
                    checked={config.features.darkMode}
                    onChange={e => updateConfig('features', { ...config.features, darkMode: e.target.checked })}
                  />
                  <span>🌙 Mode sombre</span>
                </FeatureCheckbox>
                <FeatureCheckbox>
                  <input
                    type="checkbox"
                    checked={config.features.multiLanguage}
                    onChange={e => updateConfig('features', { ...config.features, multiLanguage: e.target.checked })}
                  />
                  <span>🌍 Multi-langue</span>
                </FeatureCheckbox>
              </FeaturesGrid>
            </FormGroup>
          </Step>
        )}

        {/* ÉTAPE 6: Récapitulatif */}
        {step === 6 && (
          <Step>
            <StepTitle>✅ Récapitulatif</StepTitle>
            <StepSubtitle>Vérifiez votre configuration avant de générer votre site</StepSubtitle>

            <Summary>
              <SummarySection>
                <SummaryTitle>🏢 Informations générales</SummaryTitle>
                <SummaryItem><strong>Type:</strong> {projectTypes.find(t => t.id === config.projectType)?.name}</SummaryItem>
                <SummaryItem><strong>Nom:</strong> {config.siteName || 'Non renseigné'}</SummaryItem>
                <SummaryItem><strong>Secteur:</strong> {config.industry || 'Non renseigné'}</SummaryItem>
                {config.targetAudience && <SummaryItem><strong>Public:</strong> {config.targetAudience}</SummaryItem>}
              </SummarySection>

              <SummarySection>
                <SummaryTitle>📄 Pages ({config.pages.length})</SummaryTitle>
                {config.pages.map((page: any) => (
                  <PageSummary key={page.id}>
                    <PageSummaryName>
                      {defaultPages.find(p => p.id === page.id)?.icon} {page.name}
                    </PageSummaryName>
                    <PageSummaryBlocks>
                      {page.blocks.length} bloc(s): {page.blocks.map((b: any) => b.name).join(', ') || 'Aucun bloc'}
                    </PageSummaryBlocks>
                  </PageSummary>
                ))}
              </SummarySection>

              <SummarySection>
                <SummaryTitle>🎨 Style</SummaryTitle>
                <SummaryItem><strong>Design:</strong> {designStyles.find(s => s.id === config.designStyle)?.name}</SummaryItem>
                <SummaryItem>
                  <strong>Couleurs:</strong>
                  <ColorPreview>
                    <ColorSwatch $color={config.primaryColor} />
                    <ColorSwatch $color={config.secondaryColor} />
                  </ColorPreview>
                </SummaryItem>
                <SummaryItem>
                  <strong>Fonctionnalités:</strong>
                  {config.features.animations && ' ✨ Animations'}
                  {config.features.seo && ' 🔍 SEO'}
                  {config.features.darkMode && ' 🌙 Mode sombre'}
                  {config.features.multiLanguage && ' 🌍 Multi-langue'}
                </SummaryItem>
              </SummarySection>
            </Summary>

            <WarningBox>
              ⚠️ La génération peut prendre quelques minutes selon le nombre de pages et de blocs sélectionnés.
            </WarningBox>
          </Step>
        )}
      </Form>

      <ButtonGroup>
        {step > 1 && (
          <Button onClick={() => setStep(step - 1)} $secondary>
            ← Précédent
          </Button>
        )}
        
        {step < 6 ? (
          <Button 
            onClick={() => {
              // Validation avant de passer à l'étape suivante
              if (step === 1 && !config.projectType) {
                alert('Veuillez sélectionner un type de projet')
                return
              }
              if (step === 2 && (!config.siteName || !config.siteDescription || !config.industry)) {
                alert('Veuillez remplir tous les champs obligatoires')
                return
              }
              if (step === 3 && config.pages.length === 0) {
                alert('Veuillez sélectionner au moins une page')
                return
              }
              if (step === 4 && !currentPageConfig && config.pages.length > 0) {
                setCurrentPageConfig(config.pages[0].id)
              }
              setStep(step + 1)
            }}
          >
            Suivant →
          </Button>
        ) : (
          <Button 
            onClick={handleGenerate} 
            $primary
            disabled={config.pages.length === 0}
          >
            🚀 Générer mon site
          </Button>
        )}
      </ButtonGroup>
`
