---
title:  "Change Allowed Values for List Fields in Drupal 8"
description: Update allowed list field values for a list (text) field with existing data.
excerpt: Update allowed list field values for a list (text) field with existing data.
tags:
  - TIL
  - Drupal
  - Quick Tip
socialShareImage: https://www.aleksnyder.net/img/social-images/change-allowed-values-for-list-fields-in-drupal-8.png
date: 2021-08-17
publishdate: 2021-08-17
---

Beginning in Drupal 8, field settings were moved into configuration files.  The idea was to easily import these settings if something happened to your database and to ensure a sort of data integrity for a field's value.  Certainly an improvement to Drupal 7 (without the Features module) way of handling field settings.

What is the client wants to change the field's setting after data has already been entered?  Unless you're adding a new item (while the existing list items remain the same), you'll need to override the list values using a function in the global namespace.  This option allows for dynamic values but requires future changes to be made in this function.

{{< h2 >}}Steps to alter field values{{< /h2 >}}

### Step 1:  Create module using [Drupal Console](https://drupalconsole.com/docs/en/commands/generate-module) to contain global override function
{{< prism bash single >}}
  drupal generate:module
{{< /prism >}}

Note:  Make sure to include a .module file

### 2:  Add the global function in the module's .module file

{{< prism php >}}
  <?php

  use Drupal\field\Entity\FieldStorageConfig;
  use Drupal\Core\Entity\ContentEntityInterface;
  
  /**
   * Set dynamic allowed values for the background color field.
   */
   function custom_module_list_values(FieldStorageConfig $definition, ContentEntityInterface $entity = NULL, $cacheable) {
     return [
       'one' => 'One',
       'two' => 'Two',
       'three' => 'Three',
     ];
   }
{{< /prism >}}


### Step 3:  Find the configuration file and add the global function
In your project's synced configuration folder, look for the field's storage configuration.  The name would look something like `field.storage.paragraph.field_name_of_your_field.yml`.

Inside the storage configuration file, look for the `allowed_values_function` key.  Add the global function's name to replace the existing values with the new list array.

{{< prism yaml >}}
  allowed_values_function: custom_module_list_values
{{< /prism >}}

